---
title: Giám sát VMware với InfluxDB và Grafana
category: Monitoring
excerpt: Hướng dẫn toàn diện để thiết lập Grafana với VMware để giám sát hiệu quả các chỉ số máy chủ bằng Telegraf và InfluxDB
language: vi
---

# Giám sát VMware với InfluxDB và Grafana

Bảng điều khiển Grafana cung cấp một cách trực quan và hiệu quả để theo dõi các chỉ số máy chủ. Trong hướng dẫn này, chúng tôi sẽ hướng dẫn bạn qua quy trình thiết lập Grafana với VMware để giám sát các chỉ số khác nhau trên máy chủ của bạn một cách hiệu quả.

**Lưu ý:** Hướng dẫn này giả định rằng bạn đã có vCenter đang hoạt động, vì nó dựa vào API của vCenter.

Ở cuối bài viết này, bạn sẽ tìm thấy các liên kết đến một số bảng điều khiển Grafana tuyệt vời có sẵn để bắt đầu giám sát VMware của bạn.

## Mục lục
- [Tạo Stack Container của Bạn](#tạo-stack-container-của-bạn)
- [Cấu hình InfluxDB](#cấu-hình-influxdb)
- [Cấu hình Telegraf](#cấu-hình-telegraf)
- [Thiết lập Grafana](#thiết-lập-grafana)
- [Thiết lập Bảng điều khiển trong Grafana](#thiết-lập-bảng-điều-khiển-trong-grafana)
- [Kết luận](#kết-luận)

## Tạo Stack Container của Bạn

Tôi chạy stack giám sát bằng các container Docker, được điều phối với Docker Compose. Chúng ta sẽ thiết lập ba container:

*   **Telegraf:** Thu thập dữ liệu từ API của vCenter và gửi đến InfluxDB.
*   **InfluxDB:** Cơ sở dữ liệu lưu trữ các chỉ số của bạn.
*   **Grafana:** Hiển thị trực quan các chỉ số từ InfluxDB.

Điền vào tệp `docker-compose.yml` với nội dung sau:

```yaml
version: "3"
services:
  grafana:
    image: grafana/grafana
    container_name: grafana_container
    restart: always
    ports:
      - 3000:3000
    networks:
      - monitoring_network
    volumes:
      - grafana-volume:/var/lib/grafana

  influxdb:
    image: influxdb
    container_name: influxdb_container
    restart: always
    ports:
      - 8086:8086
      - 8089:8089/udp
    networks:
      - monitoring_network
    volumes:
      - influxdb-volume:/var/lib/influxdb

  telegraf:
    image: telegraf
    container_name: telegraf_container
    restart: always
    networks:
      - monitoring_network
    volumes:
      - ./telegraf/telegraf.conf:/etc/telegraf/telegraf.conf:ro

networks:
  monitoring_network:
    external: true

volumes:
  grafana-volume:
    external: true
  influxdb-volume:
    external: true
```

Tạo các volume Docker và network cần thiết bằng cách chạy:

```bash
docker volume create influxdb-volume
docker volume create grafana-volume
docker network create monitoring_network
```

Tôi thích sử dụng các volume riêng biệt cho InfluxDB và Grafana, chủ yếu vì lợi ích về hiệu suất.

Khởi động các container với lệnh `docker compose up -d` trong cùng thư mục với tệp `docker-compose.yml` của bạn.

**Xử lý Lỗi Khởi động:**  
Khi khởi động các container, bạn có thể gặp thông báo lỗi về cấu hình Telegraf. Đây là cách khắc phục:

1.  Điều hướng đến thư mục telegraf.
2.  Xóa tệp telegraf.conf hiện có và tạo một tệp mới:

```bash
rm -rf telegraf.conf
sudo touch telegraf.conf
```

## Cấu hình InfluxDB

Bắt đầu bằng cách truy cập `http://your_host:8086`

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-1.png" alt="Trang Cài đặt InfluxDB" class="zoomable-image">
  <div class="image-caption">Trang Cài đặt Ban đầu của InfluxDB</div>
</div>

Thực hiện theo quy trình cài đặt đơn giản, ghi lại tất cả các chi tiết để sử dụng trong các bước sau.

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-2.png" alt="Thiết lập Tổ chức InfluxDB" class="zoomable-image">
  <div class="image-caption">Cấu hình Tổ chức InfluxDB</div>
</div>

Sau khi gửi, bạn sẽ được cung cấp một token API. Hãy lưu trữ nó cẩn thận.

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-3.png" alt="Token API InfluxDB" class="zoomable-image">
  <div class="image-caption">Tạo Token API InfluxDB</div>
</div>

Lưu ý rằng instance InfluxDB này chỉ dành cho mục đích demo và sẽ bị xóa sau khi tạo hướng dẫn này. Trong điều kiện bình thường, bạn tuyệt đối không chia sẻ token này với bất kỳ ai.

## Cấu hình Telegraf

Bây giờ là lúc cấu hình Telegraf. Để làm điều này, bạn cần quay lại terminal và mở lại tệp `telegraf.conf` mà chúng ta đã tạo trước đó. Bắt đầu bằng cách điền vào với nội dung sau:

```toml
[outputs.influxdb_v2]
   urls = ["http://your_influxdb_host:8086"]
   ## Token để xác thực.
   token = "your_token_here"
   ## Tổ chức là tên của tổ chức bạn muốn ghi vào; phải tồn tại.
   organization = "Homelab"
   ## Bucket đích để ghi vào.
   bucket = "vmware"
```

Ngoài ra, sau khối `outputs`, thêm khối `inputs` sau:

```toml
# Đọc các chỉ số từ VMware vCenter
 [[inputs.vsphere]]
 ## Danh sách các URL vCenter để giám sát. Ba dòng này phải được bỏ chú thích
 ## và chỉnh sửa để plugin hoạt động.
 vcenters = [ "https://<vcenter_hostname>/sdk" ]
    username = "[email protected]"
    password = "password_here"
 #
 ## Máy ảo (VMs)
 ## Các chỉ số VM điển hình (nếu bỏ trống hoặc rỗng, tất cả các chỉ số sẽ được thu thập)
 vm_metric_include = [
      "cpu.demand.average",
      "cpu.idle.summation",
      "cpu.latency.average",
      "cpu.readiness.average",
      "cpu.ready.summation",
      "cpu.run.summation",
      "cpu.usagemhz.average",
      "cpu.used.summation",
      "cpu.wait.summation",
      "mem.active.average",
      "mem.granted.average",
      "mem.latency.average",
      "mem.swapin.average",
      "mem.swapinRate.average",
      "mem.swapout.average",
      "mem.swapoutRate.average",
      "mem.usage.average",
      "mem.vmmemctl.average",
      "net.bytesRx.average",
      "net.bytesTx.average",
      "net.droppedRx.summation",
      "net.droppedTx.summation",
      "net.usage.average",
      "power.power.average",
      "virtualDisk.numberReadAveraged.average",
      "virtualDisk.numberWriteAveraged.average",
      "virtualDisk.read.average",
      "virtualDisk.readOIO.latest",
      "virtualDisk.throughput.usage.average",
      "virtualDisk.totalReadLatency.average",
      "virtualDisk.totalWriteLatency.average",
      "virtualDisk.write.average",
      "virtualDisk.writeOIO.latest",
      "sys.uptime.latest",
    ]
 # vm_metric_exclude = [] ## Không có gì bị loại trừ theo mặc định
 # vm_instances = true ## mặc định là true
 #
 ## Hosts
 ## Các chỉ số host điển hình (nếu bỏ trống hoặc rỗng, tất cả các chỉ số sẽ được thu thập)
 host_metric_include = [
      "cpu.coreUtilization.average",
      "cpu.costop.summation",
      "cpu.demand.average",
      "cpu.idle.summation",
      "cpu.latency.average",
      "cpu.readiness.average",
      "cpu.ready.summation",
      "cpu.swapwait.summation",
      "cpu.usage.average",
      "cpu.usagemhz.average",
      "cpu.used.summation",
      "cpu.utilization.average",
      "cpu.wait.summation",
      "disk.deviceReadLatency.average",
      "disk.deviceWriteLatency.average",
      "disk.kernelReadLatency.average",
      "disk.kernelWriteLatency.average",
      "disk.numberReadAveraged.average",
      "disk.numberWriteAveraged.average",
      "disk.read.average",
      "disk.totalReadLatency.average",
      "disk.totalWriteLatency.average",
      "disk.write.average",
      "mem.active.average",
      "mem.latency.average",
      "mem.state.latest",
      "mem.swapin.average",
      "mem.swapinRate.average",
      "mem.swapout.average",
      "mem.swapoutRate.average",
      "mem.totalCapacity.average",
      "mem.usage.average",
      "mem.vmmemctl.average",
      "net.bytesRx.average",
      "net.bytesTx.average",
      "net.droppedRx.summation",
      "net.droppedTx.summation",
      "net.errorsRx.summation",
      "net.errorsTx.summation",
      "net.usage.average",
      "power.power.average",
      "storageAdapter.numberReadAveraged.average",
      "storageAdapter.numberWriteAveraged.average",
      "storageAdapter.read.average",
      "storageAdapter.write.average",
      "sys.uptime.latest",
    ]
 # host_metric_exclude = [] ## Không có gì bị loại trừ theo mặc định
 # host_instances = true ## mặc định là true
 #
 ## Clusters
 cluster_metric_include = [] ## nếu bỏ trống hoặc rỗng, tất cả các chỉ số sẽ được thu thập
 # cluster_metric_exclude = [] ## Không có gì bị loại trừ theo mặc định
 # cluster_instances = false ## mặc định là false
 #
 ## Datastores
 datastore_metric_include = [] ## nếu bỏ trống hoặc rỗng, tất cả các chỉ số sẽ được thu thập
 # datastore_metric_exclude = [] ## Không có gì bị loại trừ theo mặc định
 # datastore_instances = false ## mặc định là false cho Datastores
 #
 ## Datacenters
 datacenter_metric_include = [] ## nếu bỏ trống hoặc rỗng, tất cả các chỉ số sẽ được thu thập
 datacenter_metric_exclude = [ "*" ] ## Datacenters không được thu thập theo mặc định.
 # datacenter_instances = false ## mặc định là false cho Datastores
 #
 ## Cài đặt Plugin
 ## ký tự phân tách để sử dụng cho tên measurement và field (mặc định: "_")
 # separator = "_"
 #
 ## số lượng đối tượng để truy xuất mỗi truy vấn cho tài nguyên thời gian thực (vms và hosts)
 ## đặt thành 64 cho vCenter 5.5 và 6.0 (mặc định: 256)
 # max_query_objects = 256
 #
 ## số lượng chỉ số để truy xuất mỗi truy vấn cho tài nguyên không thời gian thực (clusters và datastores)
 ## đặt thành 64 cho vCenter 5.5 và 6.0 (mặc định: 256)
 # max_query_metrics = 256
 #
 ## số lượng go routine để sử dụng cho việc thu thập và khám phá đối tượng và chỉ số
 # collect_concurrency = 1
 # discover_concurrency = 1
 #
 ## có bắt buộc khám phá các đối tượng mới trên cuộc gọi thu thập ban đầu trước khi thu thập chỉ số hay không
 ## khi true cho các môi trường lớn, điều này có thể gây ra lỗi về thời gian trôi qua trong khi thu thập chỉ số
 ## khi false (mặc định) chu kỳ thu thập đầu tiên có thể dẫn đến không có hoặc chỉ số hạn chế trong khi các đối tượng được khám phá
 # force_discover_on_init = false
 #
 ## khoảng thời gian trước khi (tái)khám phá các đối tượng chịu sự thu thập chỉ số (mặc định: 300s)
 # object_discovery_interval = "300s"
 #
 ## thời gian chờ áp dụng cho bất kỳ yêu cầu api nào được thực hiện đến vcenter
 # timeout = "60s"
 #
 ## Cấu hình SSL Tùy chọn
 # ssl_ca = "/path/to/cafile"
 # ssl_cert = "/path/to/certfile"
 # ssl_key = "/path/to/keyfile"
 ## Sử dụng SSL nhưng bỏ qua xác minh chuỗi & máy chủ
 insecure_skip_verify = true
```

Lưu ý rằng sử dụng `insecure_skip_verify = true` là để dùng với chứng chỉ tự ký. Bạn có thể đã biết nếu điều này cần được đặt thành `false` cho môi trường của bạn.

### Hiểu về Thu thập Chỉ số Datacenter

Cấu hình bao gồm một cài đặt cụ thể cho các chỉ số datacenter:

```toml
datacenter_metric_include = [] ## nếu bỏ trống hoặc rỗng, tất cả các chỉ số sẽ được thu thập
datacenter_metric_exclude = [ "*" ] ## Datacenters không được thu thập theo mặc định.
```

Cấu hình này có nghĩa là:
- Các chỉ số Datacenter bị loại trừ theo mặc định (sử dụng ký tự đại diện `*`)
- Nếu bạn muốn thu thập các chỉ số datacenter, bạn nên:
  1. Xóa hoặc chú thích dòng `datacenter_metric_exclude`, hoặc
  2. Chỉ định rõ ràng các chỉ số datacenter nào để bao gồm trong `datacenter_metric_include`

Hầu hết người dùng không cần các chỉ số cấp datacenter vì họ thường tập trung vào VMs, hosts, clusters và datastores. Tuy nhiên, nếu yêu cầu giám sát của bạn bao gồm thông tin cấp datacenter, bạn có thể sửa đổi cài đặt này cho phù hợp.

Khởi động lại container Telegraf để áp dụng cấu hình mới:  
`docker compose restart telegraf`

Hãy kiểm tra xem dữ liệu có đang chảy đúng cách không. Để làm điều này, bạn có thể chạy `docker ps` để lấy ID container của Telegraf:

```bash
tcude@monitoring02:~/monitoring$ docker ps
CONTAINER ID   IMAGE             COMMAND                  CREATED          STATUS          PORTS                                                                                  NAMES
7d9bf5c686ce   telegraf          "/entrypoint.sh tele…"   32 minutes ago   Up 16 seconds   8092/udp, 8125/udp, 8094/tcp                                                           telegraf_container
718bb1181c55   grafana/grafana   "/run.sh"                32 minutes ago   Up 32 minutes   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp                                              grafana_container
55949c1ea88b   influxdb          "/entrypoint.sh infl…"   32 minutes ago   Up 32 minutes   0.0.0.0:8086->8086/tcp, :::8086->8086/tcp, 0.0.0.0:8089->8089/udp, :::8089->8089/udp   influxdb_container
```

Đối với thiết lập của tôi, Telegraf có ID là `7d9bf5c686ce`. Biết ID container, bạn có thể chạy `docker logs <container_id>`. Bạn sẽ thấy điều gì đó tương tự như sau:

```log
2023-12-08T15:28:09Z I! Loading config: /etc/telegraf/telegraf.conf
2023-12-08T15:28:09Z W! DeprecationWarning: Option "force_discover_on_init" of plugin "inputs.vsphere" deprecated since version 1.14.0 and will be removed in 2.0.0: option is ignored
2023-12-08T15:28:09Z I! Starting Telegraf 1.28.5 brought to you by InfluxData the makers of InfluxDB
2023-12-08T15:28:09Z I! Available plugins: 240 inputs, 9 aggregators, 29 processors, 24 parsers, 59 outputs, 5 secret-stores
2023-12-08T15:28:09Z I! Loaded inputs: vsphere
2023-12-08T15:28:09Z I! Loaded aggregators:
2023-12-08T15:28:09Z I! Loaded processors:
2023-12-08T15:28:09Z I! Loaded secretstores:
2023-12-08T15:28:09Z I! Loaded outputs: influxdb_v2
2023-12-08T15:28:09Z I! Tags enabled: host=7d9bf5c686ce
2023-12-08T15:28:09Z W! Deprecated inputs: 0 and 1 options
2023-12-08T15:28:09Z I! [agent] Config: Interval:10s, Quiet:false, Hostname:"7d9bf5c686ce", Flush Interval:10s
2023-12-08T15:28:09Z I! [inputs.vsphere] Starting plugin
```

Telegraf đã tải tệp `telegraf.conf` và mọi thứ đều ổn.

Với InfluxDB đã hoạt động và Telegraf cung cấp dữ liệu cho nó, bây giờ chúng ta có thể thiết lập Grafana!

## Thiết lập Grafana

Truy cập Grafana tại `http://<your_hostname>:3000` (thông tin đăng nhập mặc định: admin/admin).

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-4.png" alt="Trang Đăng nhập Grafana" class="zoomable-image">
  <div class="image-caption">Trang Đăng nhập Ban đầu của Grafana</div>
</div>

Thay đổi mật khẩu mặc định để đảm bảo an toàn.

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-5.png" alt="Thay đổi Mật khẩu Grafana" class="zoomable-image">
  <div class="image-caption">Thay đổi Mật khẩu Mặc định của Grafana</div>
</div>

Sau khi đăng nhập, truy cập menu bên trái của trang chủ. Trong phần `Connections`, chọn `Data sources` và sau đó `Add data sources`

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-7.png" alt="Menu Nguồn Dữ liệu Grafana" class="zoomable-image">
  <div class="image-caption">Điều hướng đến Nguồn Dữ liệu trong Grafana</div>
</div>

Bây giờ bạn sẽ được hiển thị danh sách các tùy chọn nguồn dữ liệu có thể. Chọn `InfluxDB`

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-8.png" alt="Chọn Nguồn Dữ liệu InfluxDB" class="zoomable-image">
  <div class="image-caption">Chọn InfluxDB làm Nguồn Dữ liệu</div>
</div>

Bây giờ bạn muốn cấu hình nguồn dữ liệu InfluxDB của mình tương tự như những gì tôi có ở đây:

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-9.png" alt="Cấu hình Nguồn Dữ liệu InfluxDB" class="zoomable-image">
  <div class="image-caption">Cấu hình Nguồn Dữ liệu InfluxDB trong Grafana</div>
</div>

Có một vài điều đáng chú ý ở đây:

`Query language` sẽ mặc định là `InfluxQL`. Tôi đã thay đổi thành `Flux`. InfluxQL là ngôn ngữ truy vấn kiểu SQL để tương tác với InfluxDB, tập trung vào sự đơn giản và dễ sử dụng, trong khi Flux là ngôn ngữ kịch bản dữ liệu chức năng mới hơn được thiết kế cho xử lý dữ liệu phức tạp, chuyển đổi và phân tích với InfluxDB.

Ngoài ra, bạn chỉ cần cung cấp tên người dùng và mật khẩu InfluxDB của mình trong phần `Basic Auth Details`.

Dưới `InfluxDB Details`, bạn sẽ sử dụng các giá trị giống như chúng ta đã sử dụng trước đó. Trường `Token` cần được điền với giá trị token API mà chúng ta đã nhận được trước đó.

Với tất cả những điều đó, bây giờ bạn có thể nhấp vào `Save & test`

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-10.png" alt="Kiểm tra Kết nối InfluxDB" class="zoomable-image">
  <div class="image-caption">Kiểm tra Kết nối đến InfluxDB</div>
</div>

Giả sử mọi thứ được cấu hình đúng, bạn sẽ thấy điều gì đó tương tự như hình ảnh trên.

## Thiết lập Bảng điều khiển trong Grafana

Với phần khó đã xong, bây giờ là lúc tải lên một bảng điều khiển! Để bắt đầu, sử dụng menu bên trái giống nhau, chọn `Dashboards`

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-11.png" alt="Menu Bảng điều khiển Grafana" class="zoomable-image">
  <div class="image-caption">Điều hướng đến Bảng điều khiển trong Grafana</div>
</div>

Chọn `Create Dashboard`

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-12.png" alt="Tạo Bảng điều khiển Mới" class="zoomable-image">
  <div class="image-caption">Tạo một Bảng điều khiển Mới</div>
</div>

Trong khi bạn có thể chọn cách tạo bảng điều khiển thủ công, cũng có nhiều bảng điều khiển có sẵn mà bạn có thể sử dụng để bắt đầu ngay lập tức. Những bảng này có thể được xem bằng cách nhấp vào `Import dashboard`

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-14.png" alt="Nhập Bảng điều khiển" class="zoomable-image">
  <div class="image-caption">Nhập một Bảng điều khiển Có sẵn</div>
</div>

Từ đây, bạn có thể tìm kiếm ID của bảng điều khiển bạn muốn sử dụng. Đối với mục đích của tôi, tôi sẽ bắt đầu với [bảng điều khiển này](https://grafana.com/grafana/dashboards/2840-vmware-environment/?ref=tcude.net), có thể được tìm kiếm bằng id `8159`.

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-15.png" alt="Tìm kiếm ID Bảng điều khiển" class="zoomable-image">
  <div class="image-caption">Tìm kiếm Bảng điều khiển theo ID</div>
</div>

Tất cả những gì còn lại là, dưới `InfluxDB`, chọn nguồn dữ liệu InfluxDB của bạn. Sau đó nhấp vào `Import`

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-16.png" alt="Nhập Bảng điều khiển với Nguồn Dữ liệu" class="zoomable-image">
  <div class="image-caption">Chọn Nguồn Dữ liệu và Nhập Bảng điều khiển</div>
</div>

## Kết luận

Với điều đó, bây giờ bạn đã có một bảng điều khiển Grafana đang hoạt động!

<div class="image-container">
  <img src="https://tcude.net/content/images/2023/12/image-17.png" alt="Bảng điều khiển Grafana Cuối cùng" class="zoomable-image">
  <div class="image-caption">Bảng điều khiển Grafana đang hoạt động cho Giám sát VMware</div>
</div>

Dưới đây là một số bảng điều khiển VMware tuyệt vời khác mà tôi đã tìm thấy:

*   [Bảng điều khiển vSphere Datastore Grafana – 8162](https://grafana.com/dashboards/8162?ref=tcude.net)
*   [Bảng điều khiển vSphere Hosts Grafana – 8165](https://grafana.com/dashboards/8165?ref=tcude.net)
*   [Bảng điều khiển vSphere VMs Grafana – 8168](https://grafana.com/dashboards/8168?ref=tcude.net)

<style>
.image-container {
  margin: 1rem 0;
  text-align: center;
}

.zoomable-image {
  max-width: 100%;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.zoomable-image:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.image-caption {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

/* Modal for image zoom */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.9);
}

.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90%;
}

.close {
  position: absolute;
  top: 20px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1001;
}

.close:hover,
.close:focus {
  color: #bbb;
}
</style>

<script>
// Add click event listeners to all zoomable images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.zoomable-image');
  
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'imageModal';
  
  const modalContent = document.createElement('img');
  modalContent.className = 'modal-content';
  modalContent.id = 'modalImage';
  
  const closeBtn = document.createElement('span');
  closeBtn.className = 'close';
  closeBtn.innerHTML = '&times;';
  
  modal.appendChild(modalContent);
  modal.appendChild(closeBtn);
  document.body.appendChild(modal);
  
  // Add click event to each image
  images.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'block';
      modalContent.src = this.src;
    });
  });
  
  // Close modal when clicking on X
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };
  
  // Close modal when clicking outside the image
  modal.onclick = function(event) {
    if (event.target !== modalContent) {
      modal.style.display = 'none';
    }
  };
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });
});
</script>