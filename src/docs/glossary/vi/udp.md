---
term: UDP (User Datagram Protocol)
category: Networking
language: vi
---

Giao thức Datagram Người dùng (UDP) là giao thức cốt lõi của bộ giao thức Internet cung cấp mô hình giao tiếp không kết nối với chi phí tối thiểu và không đảm bảo giao hàng tin nhắn, sắp xếp hoặc bảo vệ trùng lặp. Trong môi trường VMware, UDP được sử dụng để đồng bộ hóa thời gian, truy vấn DNS, truyền syslog và các ứng dụng thời gian thực khác nơi tốc độ quan trọng hơn độ tin cậy.

## Tổng Quan

UDP cung cấp:
- Giao tiếp không kết nối với chi phí giao thức tối thiểu
- Giao hàng tin nhắn nỗ lực tốt nhất mà không có đảm bảo độ tin cậy
- Hỗ trợ giao tiếp phát sóng và đa phát
- Truyền dữ liệu độ trễ thấp cho các ứng dụng thời gian thực

## Tính Năng Chính

### Mô Hình Giao Tiếp
- **Không Kết Nối**: Không cần thiết lập hoặc chấm dứt kết nối
- **Không Trạng Thái**: Không duy trì thông tin trạng thái kết nối
- **Tiêu Đề Đơn Giản**: Tiêu đề tối thiểu 8 byte cho chi phí giao thức
- **Dựa Trên Datagram**: Truyền tin nhắn độc lập

### Đặc Điểm Hiệu Suất
- **Độ Trễ Thấp**: Độ trễ xử lý tối thiểu để truyền gói
- **Chi Phí Tối Thiểu**: Yêu cầu xử lý giao thức giảm thiểu
- **Không Kiểm Soát Luồng**: Không có cơ chế cửa sổ hoặc xác nhận
- **Không Kiểm Soát Tắc Nghẽn**: Không có quản lý tốc độ truyền thích ứng

### Xử Lý Tin Nhắn
- **Giao Hàng Không Đáng Tin Cậy**: Không đảm bảo giao hàng tin nhắn
- **Giao Hàng Không Có Thứ Tự**: Tin nhắn có thể đến không theo thứ tự
- **Không Bảo Vệ Trùng Lặp**: Tin nhắn trùng lặp có thể được nhận
- **Kích Thước Bộ Đệm Cố Định**: Kích thước tin nhắn giới hạn dựa trên MTU mạng

## Kiến Trúc

### Cấu Trúc Giao Thức
- **Cổng Nguồn**: Số cổng nguồn 16-bit (tùy chọn)
- **Cổng Đích**: Số cổng đích 16-bit
- **Độ Dài**: Độ dài datagram UDP 16-bit
- **Tổng Kiểm Tra**: Tổng kiểm tra 16-bit để phát hiện lỗi (tùy chọn trong IPv4)

### Quy Trình Giao Tiếp
1. **Tạo Datagram**: Ứng dụng tạo datagram UDP
2. **Thêm Tiêu Đề**: Tiêu đề UDP được thêm vào dữ liệu ứng dụng
3. **Đóng Gói IP**: Datagram được đóng gói trong gói IP
4. **Truyền Mạng**: Gói được truyền qua mạng
5. **Giao Hàng**: Datagram được giao đến đích (không có xác nhận)

### Quản Lý Cổng
- **Cổng Được Biết**: Số cổng tiêu chuẩn hóa (0-1023)
- **Cổng Đã Đăng Ký**: Số cổng đã đăng ký (1024-49151)
- **Cổng Động**: Số cổng tạm thời (49152-65535)
- **Gom Nhóm Cổng**: Nhiều ứng dụng chia sẻ cổng

## Ví Dụ Cấu Hình

### Cấu Hình UDP ESXi
```bash
# Xem kết nối UDP trên host ESXi
esxcli network ip connection list | grep udp

# Kiểm tra thống kê UDP giao diện mạng
esxtop
# Nhấn 'n' để xem thống kê mạng
# Nhấn 'u' để xem thống kê UDP cụ thể

# Giám sát lưu lượng UDP
netstat -an | grep udp

# Kiểm tra cài đặt bộ đệm UDP
esxcli system settings advanced list -o /Net/UdpMaxBuffer
esxcli system settings advanced list -o /Net/UdpMinBuffer

# Xem cấu hình syslog UDP
esxcli system syslog config get
```

### Cấu Hình UDP vCenter Server
```bash
# Kiểm tra kết nối UDP trên vCenter Server
# SSH đến vCenter Server Appliance (VCSA)
admin@vcsa-host:~$ netstat -an | grep udp

# Xem cổng nghe UDP
admin@vcsa-host:~$ netstat -ulnp

# Kiểm tra kích thước bộ đệm UDP
admin@vcsa-host:~$ sysctl net.core.rmem_max
admin@vcsa-host:~$ sysctl net.core.wmem_max

# Giám sát hiệu suất UDP
admin@vcsa-host:~$ ss -uln
admin@vcsa-host:~$ ss -s
```

### Giám Sát UDP PowerCLI
```powershell
# Giám sát kết nối UDP trên host ESXi
Get-VMHost | Get-EsxCli -V2 | ForEach-Object {
    $esxcli = $_
    Write-Host "Host: $($_.VMHost.Name)"
    $esxcli.network.ip.connection.list.Invoke() | Where-Object {$_.Protocol -eq "udp"} | Format-Table
}

# Kiểm tra lưu lượng DNS UDP
Get-VMHost | Get-VMHostNetworkAdapter | ForEach-Object {
    Get-Stat -Entity $_.VMHost -Stat net.dns.queries -Instance $_.Name | Format-Table
}

# Giám sát lưu lượng NTP UDP
Get-VMHost | Get-VMHostNetworkAdapter | ForEach-Object {
    Get-Stat -Entity $_.VMHost -Stat net.ntp.packets -Instance $_.Name | Format-Table
}
```

### Cấu Hình UDP Hệ Điều Hành Khách Linux
```bash
# Xem kết nối UDP
netstat -an | grep udp
ss -uln

# Kiểm tra kích thước bộ đệm UDP
cat /proc/sys/net/core/rmem_max
cat /proc/sys/net/core/wmem_max

# Cấu hình kích thước bộ đệm UDP
echo 'net.core.rmem_max = 16777216' >> /etc/sysctl.conf
echo 'net.core.wmem_max = 16777216' >> /etc/sysctl.conf
sysctl -p

# Giám sát hiệu suất UDP
iftop -i eth0 -u udp
nethogs -t -d 1 | grep udp
```

### Cấu Hình UDP Hệ Điều Hành Khách Windows
```cmd
# Xem kết nối UDP
netstat -an -p udp
Get-NetUDPEndpoint | Format-Table

# Kiểm tra tham số UDP
netsh int udp show global

# Giám sát hiệu suất UDP
perfmon.exe
# Thêm bộ đếm: \UDPv4\Datagrams/sec
# Thêm bộ đếm: \UDPv4\Datagrams No Port/sec

# Xem thống kê UDP
netstat -s -p udp
```

## Yêu Cầu

### Yêu Cầu Mạng
- **Kết Nối IP**: Hạ tầng mạng IP chức năng
- **Khả Dụng Cổng**: Cổng mở cho dịch vụ UDP yêu cầu
- **Băng Thông**: Băng thông đầy đủ cho ứng dụng UDP
- **Độ Trễ**: Độ trễ mạng thấp cho ứng dụng thời gian thực

### Yêu Cầu Phần Cứng
- **Giao Diện Mạng**: Bộ điều hợp mạng tương thích
- **Công Suất Xử Lý**: CPU đủ để xử lý UDP
- **Bộ Nhớ**: RAM đầy đủ cho bộ đệm UDP
- **Lưu Trữ**: Lưu trữ cho nhật ký và thống kê mạng

### Yêu Cầu Phần Mềm
- **Ngăn Xếp UDP**: Triển khai giao thức UDP hệ điều hành
- **Trình Điều Khiển Mạng**: Trình điều khiển giao diện mạng tương thích
- **Phần Mềm Bảo Mật**: Tường lửa cho phép lưu lượng UDP
- **Công Cụ Giám Sát**: Công cụ giám sát hiệu suất mạng

## Tối Ưu Hiệu Suất

### Quản Lý Bộ Đệm
- **Bộ Đệm Nhận**: Tối ưu cho ứng dụng UDP thông lượng cao
- **Bộ Đệm Gửi**: Cấu hình cho mẫu truyền theo đợt
- **Kích Thước Bộ Đệm**: Cân bằng giữa sử dụng bộ nhớ và hiệu suất
- **Xử Lý Tràn Bộ Đệm**: Triển khai bảo vệ tràn bộ đệm

### Thiết Kế Ứng Dụng
- **Kích Thước Tin Nhắn**: Tối ưu cho MTU mạng để tránh phân mảnh
- **Xử Lý Theo Lô**: Nhóm tin nhắn để giảm chi phí
- **Xử Lý Lỗi**: Triển khai độ tin cậy cấp ứng dụng khi cần
- **Giới Hạn Tốc Độ**: Kiểm soát tốc độ truyền để ngăn bão hòa mạng

### Cấu Hình Mạng
- **Chất Lượng Dịch Vụ**: Ưu tiên lưu lượng UDP cho ứng dụng thời gian thực
- **Khung Jumbo**: Bật cho ứng dụng UDP băng thông cao
- **Liên Kết Mạng**: Sử dụng tổng hợp liên kết để tăng băng thông
- **Hỗ Trợ Đa Phát**: Cấu hình cho ứng dụng UDP đa phát

## Khắc Phục Sự Cố

### Vấn Đề Phổ Biến
- **Mất Gói**: Gói UDP không đến đích
- **Chặn Cổng**: Tường lửa chặn lưu lượng UDP
- **Tràn Bộ Đệm**: Không đủ không gian bộ đệm cho datagram UDP
- **Tắc Nghẽn Mạng**: Độ trễ cao ảnh hưởng đến ứng dụng UDP
- **Phân Mảnh**: Gói UDP lớn bị phân mảnh

### Lệnh Chẩn Đoán
```bash
# Kiểm tra kết nối UDP trên ESXi
esxcli network ip connection list | grep udp

# Xem thống kê mạng
esxtop  # Nhấn 'n' cho chế độ xem mạng, 'u' cho UDP

# Giám sát lưu lượng UDP trên Linux
ss -uln
netstat -s | grep -i udp

# Giám sát UDP trên Windows
netstat -an -p udp
Get-NetUDPEndpoint | Where-Object {$_.LocalAddress -ne "127.0.0.1"}

# Kiểm tra lỗi UDP
cat /proc/net/udp
cat /proc/net/udp6

# Kiểm tra kết nối UDP
nc -u -z hostname port
```

## Tích Hợp VMware

### Đồng Bộ Hóa Thời Gian
- **Lưu Lượng NTP**: Cổng UDP 123 cho giao thức thời gian mạng
- **Đồng Bộ ESXi**: Đồng bộ hóa thời gian dựa trên UDP
- **Thời Gian vCenter**: Quản lý thời gian tập trung qua UDP
- **Đồng Bộ Khách**: Đồng bộ hóa thời gian VM sử dụng UDP

### Phân Giải Tên
- **Truy Vấn DNS**: Cổng UDP 53 để tra cứu DNS
- **Truy Vấn Đệ Quy**: Phân giải DNS sử dụng UDP
- **DNS Đa Phát**: Phân giải tên mạng cục bộ
- **DNS Động**: Đăng ký máy chủ sử dụng UDP

### Ghi Nhật Ký và Giám Sát
- **Truyền Syslog**: Cổng UDP 514 để chuyển tiếp nhật ký
- **Bẫy SNMP**: Giám sát mạng dựa trên UDP
- **Chỉ Số Hiệu Suất**: Truyền dữ liệu giám sát qua UDP
- **Thông Báo Cảnh Báo**: Giao hàng cảnh báo thời gian thực

### Ứng Dụng Thời Gian Thực
- **Voice over IP**: Giao tiếp thoại thời gian thực
- **Phát Video**: Truyền video trực tiếp
- **Trò Chơi Trực Tuyến**: Ứng dụng trò chơi độ trễ thấp
- **Giao Dịch Tài Chính**: Hệ thống giao dịch tần suất cao

## Công Nghệ Liên Quan

- [DNS](/glossary/term/dns.md)
- [NTP](/glossary/term/ntp.md)
- [TCP](/glossary/term/tcp.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [Mạng](/glossary/term/network.md)