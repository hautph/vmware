---
term: DNS (Domain Name System)
category: Networking
---

Hệ thống Tên miền (DNS) là hệ thống đặt tên phân cấp và phân tán cho máy tính, dịch vụ hoặc các tài nguyên khác kết nối với Internet hoặc mạng riêng. Trong môi trường VMware, DNS rất cần thiết để phân giải tên, khám phá dịch vụ và giao tiếp đúng giữa các máy ảo, host ESXi và vCenter Server.

## Tổng Quan

DNS cung cấp:
- Tên miền có thể đọc được cho ánh xạ địa chỉ IP
- Cơ sở dữ liệu phân tán để phân giải tên
- Cấu trúc đặt tên phân cấp với các cấp độ tên miền
- Hỗ trợ nhiều loại bản ghi và dịch vụ

## Tính Năng Chính

### Phân Giải Tên
- **Tra Cứu Xuôi**: Phân giải tên miền thành địa chỉ IP
- **Tra Cứu Ngược**: Phân giải địa chỉ IP thành tên miền
- **Truy Vấn Đệ Quy**: Chuỗi truy vấn qua các máy chủ DNS
- **Truy Vấn Lặp**: Truy vấn trực tiếp đến máy chủ có thẩm quyền

### Loại Bản Ghi
- **Bản Ghi A**: Ánh xạ địa chỉ IPv4 cho tên máy chủ
- **Bản Ghi AAAA**: Ánh xạ địa chỉ IPv6 cho tên máy chủ
- **Bản Ghi CNAME**: Bí danh tên chuẩn cho tên máy chủ
- **Bản Ghi MX**: Đặc tả máy chủ trao đổi thư
- **Bản Ghi NS**: Thông tin ủy quyền máy chủ tên
- **Bản Ghi PTR**: Bản ghi con trỏ cho DNS ngược
- **Bản Ghi SRV**: Bản ghi vị trí dịch vụ
- **Bản Ghi TXT**: Bản ghi thông tin văn bản

### Quản Lý Vùng
- **Vùng Chính**: Vùng có thẩm quyền với truy cập đọc-ghi
- **Vùng Phụ**: Bản sao chỉ đọc của vùng chính
- **Vùng Stub**: Thông tin vùng tối thiểu để ủy quyền
- **Chuyển Tiếp Có Điều Kiện**: Chuyển tiếp cụ thể cho tên miền

## Kiến Trúc

### Phân Cấp DNS
- **Máy Chủ Gốc**: Máy chủ DNS cấp cao nhất (vùng gốc .)
- **Tên Miền Cấp Cao**: .com, .org, .net, mã quốc gia
- **Tên Miền Cấp Hai**: Tên miền cụ thể của tổ chức
- **Tên Miền Con**: Tên miền cụ thể bộ phận hoặc dịch vụ
- **Bản Ghi Máy Chủ**: Ánh xạ tên máy chủ riêng lẻ

### Loại Máy Chủ
- **Máy Chủ Có Thẩm Quyền**: Cung cấp câu trả lời quyết định cho vùng
- **Trình Phân Giải Đệ Quy**: Thực hiện phân giải truy vấn đầy đủ cho khách hàng
- **Máy Chủ Chuyển Tiếp**: Chuyển tiếp truy vấn đến máy chủ DNS khác
- **Máy Chủ Bộ Nhớ Đệm**: Bộ nhớ đệm kết quả truy vấn để hiệu suất

### Quy Trình Phân Giải
1. **Truy Vấn Khách Hàng**: Ứng dụng yêu cầu phân giải tên
2. **Kiểm Tra Trình Phân Giải**: Trình phân giải cục bộ kiểm tra bộ nhớ đệm
3. **Truy Vấn Đệ Quy**: Trình phân giải truy vấn phân cấp DNS
4. **Máy Chủ Gốc**: Truy vấn bắt đầu tại máy chủ gốc
5. **Máy Chủ TLD**: Máy chủ tên miền cấp cao được liên hệ
6. **Máy Chủ Có Thẩm Quyền**: Máy chủ có thẩm quyền của vùng được liên hệ
7. **Phản Hồi**: Câu trả lời được trả về khách hàng
8. **Bộ Nhớ Đệm**: Kết quả được lưu vào bộ nhớ đệm cho truy vấn tương lai

## Ví Dụ Cấu Hình

### Cấu Hình DNS ESXi
```bash
# Cấu hình máy chủ DNS trên host ESXi
esxcli network ip dns server add --server=8.8.8.8
esxcli network ip dns server add --server=8.8.4.4

# Đặt tên miền tìm kiếm
esxcli network ip dns search add --domain=example.com
esxcli network ip dns search add --domain=internal.example.com

# Xem cấu hình DNS
esxcli network ip dns server list
esxcli network ip dns search list

# Kiểm tra phân giải DNS
nslookup vcenter.example.com
dig vcenter.example.com
```

### Cấu Hình DNS vCenter Server
```bash
# Cấu hình DNS trên vCenter Server Appliance (VCSA)
# 1. Truy cập giao diện VAMI tại https://vcsa-host:5480
# 2. Điều hướng đến Mạng > DNS
# 3. Cấu hình máy chủ DNS và tên miền tìm kiếm
# 4. Áp dụng và khởi động lại dịch vụ mạng

# Cấu hình dòng lệnh cho VCSA
admin@vcsa-host:~$ network.dns.set --servers=8.8.8.8,8.8.4.4
admin@vcsa-host:~$ network.dns.set --domainlist=example.com,internal.example.com
```

### Quản Lý DNS PowerCLI
```powershell
# Cấu hình DNS cho nhiều host ESXi
$DNSServers = @("8.8.8.8", "8.8.4.4")
$SearchDomains = @("example.com", "internal.example.com")

Get-VMHost | Get-VMHostNetwork | Set-VMHostNetwork -DnsAddress $DNSServers -DnsSearchDomain $SearchDomains

# Kiểm tra cấu hình DNS
Get-VMHost | Get-VMHostNetwork | Select-Object HostName, DnsAddress, DnsSearchDomain

# Xác minh phân giải DNS trên host
Get-VMHost | Get-EsxCli -V2 | ForEach-Object {
    $esxcli = $_
    $esxcli.network.ip.dns.server.list.Invoke()
}
```

### Cấu Hình DNS Hệ Điều Hành Khách Linux
```bash
# Cấu hình DNS trên hệ thống Linux
# Chỉnh sửa /etc/resolv.conf
nameserver 8.8.8.8
nameserver 8.8.4.4
search example.com internal.example.com

# Cấu hình DNS với NetworkManager
nmcli con mod "System eth0" ipv4.dns "8.8.8.8,8.8.4.4"
nmcli con mod "System eth0" ipv4.dns-search "example.com,internal.example.com"
nmcli con up "System eth0"

# Kiểm tra phân giải DNS
nslookup vcenter.example.com
dig vcenter.example.com
host vcenter.example.com
```

### Cấu Hình DNS Hệ Điều Hành Khách Windows
```cmd
# Cấu hình DNS trên hệ thống Windows
netsh interface ip set dns "Ethernet" static 8.8.8.8
netsh interface ip add dns "Ethernet" 8.8.4.4 index=2

# Đặt hậu tố tìm kiếm DNS
netsh interface ip set dns "Ethernet" register=primary
netsh interface ip set dns "Ethernet" search=example.com,internal.example.com

# Kiểm tra phân giải DNS
nslookup vcenter.example.com
ping vcenter.example.com
```

## Yêu Cầu

### Yêu Cầu Mạng
- **Truy Cập Cổng**: Cổng UDP/TCP 53 phải mở
- **Quy Tắc Tường Lửa**: Cho phép lưu lượng DNS qua tường lửa
- **Độ Trễ Mạng**: Độ trễ thấp để phân giải nhanh
- **Dự Phòng**: Nhiều máy chủ DNS để chịu lỗi

### Yêu Cầu Phần Cứng
- **Tài Nguyên Máy Chủ**: CPU, bộ nhớ và lưu trữ đầy đủ
- **Giao Diện Mạng**: Kết nối mạng đáng tin cậy
- **Lưu Trữ**: Dung lượng đủ cho tệp vùng và nhật ký
- **Sao Lưu**: Sao lưu định kỳ cấu hình DNS

### Yêu Cầu Phần Mềm
- **Phần Mềm Máy Chủ DNS**: BIND, Windows DNS hoặc phần mềm DNS khác
- **Hệ Điều Hành**: OS tương thích với hỗ trợ DNS
- **Cập Nhật Bảo Mật**: Cập nhật định kỳ cho phần mềm DNS
- **Công Cụ Giám Sát**: Công cụ giám sát hiệu suất DNS

## Thực Hành Tốt Nhất

### Cấu Hình Máy Chủ
- **Nhiều Máy Chủ**: Triển khai ít nhất hai máy chủ DNS
- **Phân Bố Địa Lý**: Đặt máy chủ ở các vị trí khác nhau
- **Cân Bằng Tải**: Phân phối truy vấn trên các máy chủ
- **Tăng Cường Bảo Mật**: Bảo mật máy chủ DNS chống lại các cuộc tấn công

### Quản Lý Vùng
- **Ủy Quyền Vùng**: Ủy quyền đúng tên miền con
- **Cài Đặt TTL**: Giá trị TTL phù hợp cho bản ghi
- **Cập Nhật Động**: Kiểm soát cập nhật DNS động
- **Chuyển Vùng**: Cấu hình chuyển vùng an toàn

### Xem Xét Bảo Mật
- **DNSSEC**: Triển khai Tiện ích mở rộng Bảo mật DNS
- **Kiểm Soát Truy Cập**: Hạn chế chuyển vùng và cập nhật vùng
- **Ghi Nhật Ký**: Bật ghi nhật ký DNS chi tiết
- **Giám Sát**: Giám sát hoạt động DNS đáng ngờ

### Tối Ưu Hiệu Suất
- **Bộ Nhớ Đệm**: Tối ưu cài đặt bộ nhớ đệm DNS
- **Đệ Quy**: Kiểm soát hành vi truy vấn đệ quy
- **Chuyển Tiếp**: Sử dụng chuyển tiếp có điều kiện cho tên miền bên ngoài
- **Chia Tách DNS**: Tách chế độ xem DNS nội bộ và bên ngoài

## Khắc Phục Sự Cố

### Vấn Đề Phổ Biến
- **Lỗi Phân Giải**: Tên không phân giải thành địa chỉ
- **Kết Nối Mạng**: Vấn đề kết nối đến máy chủ DNS
- **Chặn Tường Lửa**: Lưu lượng DNS bị chặn
- **Lỗi Cấu Hình**: Địa chỉ máy chủ DNS không đúng
- **Vấn Đề Bộ Nhớ Đệm**: Bộ nhớ đệm DNS lỗi thời hoặc bị hỏng

### Lệnh Chẩn Đoán
```bash
# Kiểm tra cấu hình DNS trên ESXi
esxcli network ip dns server list
esxcli network ip dns search list

# Kiểm tra phân giải DNS
nslookup vcenter.example.com
dig vcenter.example.com
host vcenter.example.com

# Kiểm tra kết nối mạng đến máy chủ DNS
nc -z 8.8.8.8 53
ping 8.8.8.8

# Xem bộ nhớ đệm DNS trên Linux
systemd-resolve --statistics
rndc dumpdb -cache

# Kiểm tra DNS trên Windows
ipconfig /displaydns
nslookup -type=any example.com
```

## Tích Hợp VMware

### Tích Hợp DNS ESXi
- **Đặt Tên Host**: Phân giải tên máy chủ đúng cho host ESXi
- **Khám Phá Dịch Vụ**: Khám phá vCenter và các dịch vụ khác
- **DNS VM**: Cấu hình DNS cho máy ảo
- **Dịch Vụ Mạng**: Tích hợp với mạng vSphere

### DNS vCenter Server
- **Đăng Ký Dịch Vụ**: Đăng ký dịch vụ vCenter trong DNS
- **Truy Cập Khách Hàng**: Cho phép truy cập khách hàng qua tên DNS
- **Quản Lý Chứng Chỉ**: Tên DNS cho SAN chứng chỉ
- **Cân Bằng Tải**: Cân bằng tải dựa trên DNS cho dịch vụ

### Xem Xét Máy Ảo
- **DNS Khách**: Cấu hình DNS cho hệ điều hành khách
- **DNS Động**: Bật DDNS để đăng ký VM
- **Tên Miền Tìm Kiếm**: Cấu hình tên miền tìm kiếm phù hợp
- **Chuyển Tiếp DNS**: Chuyển tiếp truy vấn đến DNS doanh nghiệp

## Công Nghệ Liên Quan

- [NTP](/glossary/term/ntp.md)
- [TCP](/glossary/term/tcp.md)
- [UDP](/glossary/term/udp.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [Mạng](/glossary/term/network.md)