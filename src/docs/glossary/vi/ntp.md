---
term: NTP (Network Time Protocol)
category: Networking
---

Giao thức Thời gian Mạng (NTP) là một giao thức mạng được thiết kế để đồng bộ hóa đồng hồ của các hệ thống máy tính qua mạng. Trong môi trường VMware, NTP rất quan trọng để duy trì tính nhất quán thời gian trên các host ESXi, vCenter Server và máy ảo, đảm bảo hoạt động đúng của các ứng dụng nhạy cảm thời gian và tương quan nhật ký chính xác.

## Tổng Quan

NTP cung cấp:
- Đồng bộ hóa thời gian chính xác trên các hệ thống mạng
- Kiến trúc nguồn thời gian phân cấp với các cấp độ stratum
- Điều chỉnh thời gian tự động và hiệu chỉnh trôi
- Hỗ trợ cơ chế xác thực và bảo mật

## Tính Năng Chính

### Đồng Bộ Hóa Thời Gian
- **Định Thời Chính Xác**: Độ chính xác đồng bộ trong vòng mili giây
- **Bù Trôi**: Điều chỉnh tự động cho trôi đồng hồ
- **Xử Lý Giây Nhảy**: Xử lý đúng giây nhảy
- **Hỗ Trợ Múi Giờ**: Hỗ trợ các múi giờ khác nhau và giờ tiết kiệm ánh sáng ban ngày

### Tính Năng Giao Thức
- **Vận Chuyển UDP**: Sử dụng cổng UDP 123 để giao tiếp
- **Mô Hình Khách-Chủ**: Khách hàng đồng bộ với máy chủ thời gian
- **Chế Độ Ngang Hàng**: Máy chủ có thể đồng bộ với nhau
- **Chế Độ Phát Sóng**: Phân phối thời gian hiệu quả cho nhiều khách hàng

### Tính Năng Bảo Mật
- **Xác Thực**: Hỗ trợ xác thực MD5 và SHA1
- **Autokey**: Xác thực khóa công khai cho NTP
- **Kiểm Soát Truy Cập**: Hạn chế khách hàng nào có thể đồng bộ
- **Mã Hóa**: Truyền thông an toàn dữ liệu thời gian

## Kiến Trúc

### Cấp Độ Stratum
- **Stratum 0**: Đồng hồ tham chiếu (đồng hồ nguyên tử, bộ thu GPS)
- **Stratum 1**: Máy chủ kết nối trực tiếp với thiết bị Stratum 0
- **Stratum 2**: Máy chủ đồng bộ với máy chủ Stratum 1
- **Stratum 3**: Máy chủ đồng bộ với máy chủ Stratum 2
- **Đồng Hồ Cục Bộ**: Hệ thống sử dụng đồng hồ riêng làm nguồn thời gian

### Cấu Trúc Pool NTP
- **Pool NTP Công Cộng**: Máy chủ thời gian miễn phí cho công chúng
- **Pool Địa Lý**: Máy chủ thời gian cụ thể theo khu vực
- **Pool Nhà Cung Cấp**: Máy chủ thời gian do tổ chức cung cấp
- **Pool Riêng Tư**: Triển khai máy chủ thời gian tùy chỉnh

### Quy Trình Đồng Bộ Hóa
1. **Truy Vấn Thời Gian**: Khách hàng yêu cầu thời gian từ máy chủ
2. **Phản Hồi Thời Gian**: Máy chủ phản hồi với thời gian hiện tại
3. **Tính Toán Độ Lệch**: Khách hàng tính toán sự khác biệt thời gian
4. **Điều Chỉnh**: Khách hàng điều chỉnh đồng hồ dựa trên độ lệch
5. **Giám Sát**: Giám sát và điều chỉnh liên tục

## Ví Dụ Cấu Hình

### Cấu Hình NTP ESXi
```bash
# Cấu hình máy chủ NTP trên host ESXi
esxcli system ntp set --server=ntp1.example.com,ntp2.example.com

# Bật khách hàng NTP
esxcli system ntp set --enabled=true

# Khởi động dịch vụ NTP
esxcli system ntp set --startup-type=on

# Kiểm tra trạng thái NTP
esxcli system ntp get

# Xem các máy ngang hàng NTP
esxcli system ntp peer list

# Buộc đồng bộ hóa thời gian ngay lập tức
esxcli system time set -d
```

### Cấu Hình NTP vCenter Server
```bash
# Cấu hình NTP trên vCenter Server Appliance (VCSA)
# 1. Truy cập giao diện VAMI tại https://vcsa-host:5480
# 2. Điều hướng đến Hệ thống > Thời gian
# 3. Thêm máy chủ NTP
# 4. Bật khách hàng NTP
# 5. Khởi động dịch vụ NTP

# Cấu hình dòng lệnh cho VCSA
admin@vcsa-host:~$ timesync.tz set --timezone=UTC
admin@vcsa-host:~$ timesync.ntp set --servers=ntp1.example.com,ntp2.example.com
admin@vcsa-host:~$ timesync.enabled set --enabled=true
```

### Quản Lý NTP PowerCLI
```powershell
# Cấu hình NTP cho nhiều host ESXi
$NTPServers = @("ntp1.example.com", "ntp2.example.com")
Get-VMHost | Add-VMHostNtpServer -NtpServer $NTPServers
Get-VMHost | Get-VMHostService | Where-Object {$_.Key -eq "ntpd"} | Set-VMHostService -Policy "on" -Confirm:$false
Get-VMHost | Get-VMHostService | Where-Object {$_.Key -eq "ntpd"} | Start-VMHostService -Confirm:$false

# Kiểm tra cấu hình NTP
Get-VMHost | Get-VMHostNtpServer
Get-VMHost | Get-VMHostService | Where-Object {$_.Key -eq "ntpd"}

# Xác minh đồng bộ hóa thời gian
Get-VMHost | Get-View | Select-Object Name, @{N="CurrentTime";E={$_.Config.DateTimeInfo.TimeZone.Name}}
```

### Cấu Hình NTP Hệ Điều Hành Khách Linux
```bash
# Cấu hình NTP trên hệ thống Linux
# Chỉnh sửa /etc/ntp.conf hoặc /etc/chrony.conf
server ntp1.example.com iburst
server ntp2.example.com iburst

# Khởi động và bật dịch vụ NTP
systemctl start ntp
systemctl enable ntp

# Kiểm tra trạng thái đồng bộ hóa
ntpq -p
chrony sources -v

# Buộc đồng bộ hóa ngay lập tức
ntpdate -s ntp1.example.com
```

### Cấu Hình NTP Hệ Điều Hành Khách Windows
```cmd
# Cấu hình NTP trên hệ thống Windows
w32tm /config /manualpeerlist:"ntp1.example.com ntp2.example.com" /syncfromflags:manual /reliable:yes /update
w32tm /config /update
w32tm /resync

# Kiểm tra trạng thái đồng bộ hóa
w32tm /query /status
w32tm /query /peers

# Buộc đồng bộ hóa ngay lập tức
w32tm /resync /force
```

## Yêu Cầu

### Yêu Cầu Mạng
- **Truy Cập Cổng**: Cổng UDP 123 phải mở
- **Quy Tắc Tường Lửa**: Cho phép lưu lượng NTP qua tường lửa
- **Độ Trễ Mạng**: Độ trễ thấp để đồng bộ hóa chính xác
- **Băng Thông**: Yêu cầu băng thông tối thiểu

### Yêu Cầu Phần Cứng
- **Nguồn Đồng Hồ**: Nguồn thời gian đáng tin cậy cho máy chủ Stratum 1
- **Giao Diện Mạng**: Kết nối mạng ổn định
- **Lưu Trữ**: Lưu trữ đầy đủ cho nhật ký và cấu hình
- **Công Suất Xử Lý**: Yêu cầu CPU tối thiểu

### Yêu Cầu Phần Mềm
- **Daemon NTP**: Phần mềm dịch vụ NTP (ntpd, chronyd, w32time)
- **Hệ Điều Hành**: OS tương thích với hỗ trợ NTP
- **Khóa Xác Thực**: Cho cấu hình NTP an toàn
- **Công Cụ Giám Sát**: Công cụ giám sát đồng bộ hóa thời gian

## Thực Hành Tốt Nhất

### Lựa Chọn Máy Chủ
- **Nhiều Máy Chủ**: Cấu hình ít nhất hai máy chủ NTP
- **Gần Địa Lý**: Sử dụng máy chủ thời gian gần để độ chính xác tốt hơn
- **Độ Tin Cậy**: Chọn máy chủ thời gian đáng tin cậy và được bảo trì tốt
- **Dự Phòng**: Triển khai các nguồn thời gian dự phòng

### Cấu Hình Bảo Mật
- **Kiểm Soát Truy Cập**: Hạn chế hệ thống nào có thể truy vấn máy chủ thời gian
- **Xác Thực**: Bật xác thực cho môi trường an toàn
- **Giám Sát**: Giám sát lưu lượng NTP để phát hiện bất thường
- **Cập Nhật**: Cập nhật phần mềm NTP với các bản vá bảo mật

### Giám Sát và Bảo Trì
- **Kiểm Tra Thường Xuyên**: Giám sát đồng bộ hóa thời gian thường xuyên
- **Phân Tích Nhật Ký**: Phân tích nhật ký NTP để phát hiện vấn đề
- **Tinh Chỉnh Hiệu Suất**: Điều chỉnh cài đặt để hiệu suất tối ưu
- **Tài Liệu**: Tài liệu hóa cấu hình NTP và quy trình

## Khắc Phục Sự Cố

### Vấn Đề Phổ Biến
- **Trôi Thời Gian**: Đồng hồ trôi lệch theo thời gian
- **Kết Nối Mạng**: Vấn đề kết nối đến máy chủ NTP
- **Chặn Tường Lửa**: Lưu lượng NTP bị chặn
- **Lỗi Cấu Hình**: Địa chỉ máy chủ NTP không đúng
- **Lỗi Xác Thực**: Không khớp khóa xác thực

### Lệnh Chẩn Đoán
```bash
# Kiểm tra trạng thái NTP trên ESXi
esxcli system ntp get
esxcli system ntp peer list

# Xem nhật ký đồng bộ hóa thời gian
tail -f /var/log/vmkernel.log | grep ntp

# Kiểm tra kết nối mạng đến máy chủ NTP
nc -u -z ntp1.example.com 123
ping ntp1.example.com

# Xác minh thời gian trên hệ thống Linux
ntpq -p
chrony sources -v
timedatectl status

# Kiểm tra thời gian trên hệ thống Windows
w32tm /query /status
w32tm /query /peers

# Buộc đồng bộ hóa thời gian
ntpdate -d ntp1.example.com
```

## Tích Hợp VMware

### Đồng Bộ Hóa Thời Gian ESXi
- **Thời Gian Host**: Host ESXi duy trì thời gian riêng
- **Thời Gian VM**: Máy ảo kế thừa cài đặt thời gian host
- **Thời Gian Ảnh Chụp**: Xử lý thời gian trong hoạt động ảnh chụp
- **Thời Gian vMotion**: Tính nhất quán thời gian trong di chuyển trực tiếp

### Thời Gian vCenter Server
- **Quản Lý Tập Trung**: Quản lý NTP cho nhiều host
- **Hoạt Động Dựa Trên Thời Gian**: Lên lịch tác vụ dựa trên thời gian
- **Tương Quan Nhật Ký**: Tương quan nhật ký trên nhiều hệ thống
- **Quản Lý Chứng Chỉ**: Hoạt động chứng chỉ nhạy cảm thời gian

### Xem Xét Máy Ảo
- **Công Cụ Đồng Bộ Thời Gian**: Đồng bộ hóa thời gian VMware Tools
- **Thời Gian Hệ Điều Hành Khách**: Đồng bộ hóa thời gian hệ điều hành khách với host
- **Tác Động Ảnh Chụp**: Xử lý thời gian trong ảnh chụp
- **Yêu Cầu Ứng Dụng**: Nhu cầu ứng dụng nhạy cảm thời gian

## Công Nghệ Liên Quan

- [DNS](/glossary/term/dns.md)
- [TCP](/glossary/term/tcp.md)
- [UDP](/glossary/term/udp.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [VMware Tools](/glossary/term/vmware-tools.md)