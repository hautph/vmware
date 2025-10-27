---
term: TCP (Transmission Control Protocol)
category: Networking
language: vi
---

Giao thức Điều khiển Truyền tải (TCP) là giao thức cốt lõi của bộ giao thức Internet cung cấp việc giao dữ liệu đáng tin cậy, có thứ tự và kiểm tra lỗi giữa các ứng dụng chạy trên các máy chủ giao tiếp qua mạng IP. Trong môi trường VMware, TCP là cơ bản cho giao diện quản lý, vMotion, giao thức lưu trữ và hầu như tất cả các giao tiếp mạng giữa máy ảo và hệ thống bên ngoài.

## Tổng Quan

TCP cung cấp:
- Giao tiếp hướng kết nối với giao dữ liệu đáng tin cậy
- Cơ chế phát hiện và sửa lỗi
- Kiểm soát luồng và quản lý tắc nghẽn
- Giao dữ liệu có thứ tự các gói dữ liệu

## Tính Năng Chính

### Quản Lý Kết Nối
- **Bắt Tay Ba Bước**: Thiết lập kết nối đáng tin cậy giữa các máy chủ
- **Kết Thúc Kết Nối**: Chấm dứt kết nối một cách duyên dáng
- **Quản Lý Phiên**: Duy trì thông tin trạng thái kết nối
- **Giữ Kết Nối**: Phát hiện lỗi kết nối và duy trì kết nối

### Tính Năng Độ Tin Cậy
- **Xác Nhận**: Xác nhận nhận gói dữ liệu
- **Gửi Lại**: Gửi lại gói bị mất hoặc hỏng
- **Số Thứ Tự**: Đảm bảo thứ tự đúng của dữ liệu
- **Tổng Kiểm Tra**: Phát hiện và sửa lỗi dữ liệu

### Kiểm Soát Luồng
- **Mở Rộng Cửa Sổ**: Điều chỉnh động cửa sổ truyền
- **Kiểm Soát Tắc Nghẽn**: Thích ứng với điều kiện mạng
- **Quản Lý Bộ Đệm**: Sử dụng hiệu quả bộ đệm mạng
- **Giới Hạn Tốc Độ**: Kiểm soát tốc độ truyền dữ liệu

### Chất Lượng Dịch Vụ
- **Xử Lý Ưu Tiên**: Phân biệt lưu lượng dựa trên tầm quan trọng
- **Quản Lý Trễ**: Tối thiểu hóa độ trễ truyền
- **Phân Bổ Băng Thông**: Sử dụng hiệu quả băng thông khả dụng
- **Phục Hồi Lỗi**: Phục hồi tự động từ lỗi truyền

## Kiến Trúc

### Ngăn Xếp Giao Thức
- **Tầng Ứng Dụng**: Giao diện với ứng dụng và dịch vụ
- **Tầng Vận Chuyển**: Triển khai giao thức TCP
- **Tầng Mạng**: Định tuyến và địa chỉ IP
- **Tầng Liên Kết Dữ Liệu**: Ethernet và các giao thức liên kết khác
- **Tầng Vật Lý**: Truyền mạng vật lý

### Trạng Thái Kết Nối
- **ĐÓNG**: Không có trạng thái kết nối
- **NGHE**: Chờ yêu cầu kết nối đến
- **GỬI-SYN**: Yêu cầu kết nối đã gửi
- **NHẬN-SYN**: Yêu cầu kết nối đã nhận
- **THIẾT LẬP**: Giai đoạn truyền dữ liệu
- **CHỜ-KẾT THÚC-1**: Khởi tạo chấm dứt kết nối
- **CHỜ-KẾT THÚC-2**: Chờ chấm dứt kết nối
- **CHỜ-ĐÓNG**: Chờ đóng kết nối
- **ĐANG ĐÓNG**: Chấm dứt kết nối đang tiến hành
- **ACK-CUỐI**: Chờ xác nhận cuối cùng
- **CHỜ-THỜI GIAN**: Chờ bản sao gói tin

### Quy Trình Luồng Dữ Liệu
1. **Thiết Lập Kết Nối**: Quy trình bắt tay ba bước
2. **Truyền Dữ Liệu**: Truyền dữ liệu đáng tin cậy với xác nhận
3. **Kiểm Soát Luồng**: Cơ chế kiểm soát luồng dựa trên cửa sổ
4. **Kiểm Soát Tắc Nghẽn**: Quản lý tốc độ truyền thích ứng
5. **Chấm Dứt Kết Nối**: Bắt tay bốn bước để đóng duyên dáng

## Ví Dụ Cấu Hình

### Cấu Hình TCP ESXi
```bash
# Xem thống kê TCP trên host ESXi
esxtop
# Nhấn 'n' để xem thống kê mạng
# Nhấn 't' để xem thống kê ngăn xếp TCP/IP

# Kiểm tra cài đặt TCP giao diện mạng
esxcli network ip interface list
esxcli network ip interface ipv4 get -i vmk0

# Xem thông tin kết nối TCP
netstat -an | grep tcp

# Kiểm tra kích thước bộ đệm TCP
esxcli system settings advanced list -o /Net/TcpipHeapSize
esxcli system settings advanced list -o /Net/TcpipHeapMax
```

### Cấu Hình TCP vCenter Server
```bash
# Kiểm tra kết nối TCP trên vCenter Server
# SSH đến vCenter Server Appliance (VCSA)
admin@vcsa-host:~$ netstat -an | grep tcp

# Xem cổng nghe
admin@vcsa-host:~$ netstat -tlnp

# Kiểm tra cài đặt bộ đệm TCP
admin@vcsa-host:~$ sysctl net.ipv4.tcp_rmem
admin@vcsa-host:~$ sysctl net.ipv4.tcp_wmem

# Giám sát hiệu suất TCP
admin@vcsa-host:~$ ss -tuln
admin@vcsa-host:~$ ss -s
```

### Giám Sát TCP PowerCLI
```powershell
# Giám sát kết nối TCP trên host ESXi
Get-VMHost | Get-EsxCli -V2 | ForEach-Object {
    $esxcli = $_
    Write-Host "Host: $($_.VMHost.Name)"
    $esxcli.network.ip.connection.list.Invoke() | Where-Object {$_.Protocol -eq "tcp"} | Format-Table
}

# Kiểm tra thống kê hiệu suất mạng
Get-VMHost | Get-Stat -Stat net.throughput.average -Realtime | Format-Table

# Giám sát hiệu suất mạng vMotion
Get-VMHost | Get-VMHostNetworkAdapter -VMKernel | Where-Object {$_.VMotionEnabled -eq $true} | ForEach-Object {
    Get-Stat -Entity $_.VMHost -Stat net.throughput.average -Instance $_.Name | Format-Table
}
```

### Cấu Hình TCP Hệ Điều Hành Khách Linux
```bash
# Xem kết nối TCP
netstat -an | grep tcp
ss -tuln

# Kiểm tra kích thước bộ đệm TCP
cat /proc/sys/net/ipv4/tcp_rmem
cat /proc/sys/net/ipv4/tcp_wmem

# Cấu hình kích thước bộ đệm TCP
echo 'net.core.rmem_max = 16777216' >> /etc/sysctl.conf
echo 'net.core.wmem_max = 16777216' >> /etc/sysctl.conf
echo 'net.ipv4.tcp_rmem = 4096 65536 16777216' >> /etc/sysctl.conf
echo 'net.ipv4.tcp_wmem = 4096 65536 16777216' >> /etc/sysctl.conf
sysctl -p

# Giám sát hiệu suất TCP
iftop -i eth0
nethogs
```

### Cấu Hình TCP Hệ Điều Hành Khách Windows
```cmd
# Xem kết nối TCP
netstat -an
Get-NetTCPConnection | Format-Table

# Kiểm tra tham số TCP
netsh int tcp show global
netsh int ip show config

# Cấu hình cài đặt TCP
netsh int tcp set global autotuninglevel=normal
netsh int tcp set global chimney=enabled
netsh int tcp set global netdma=enabled

# Giám sát hiệu suất TCP
perfmon.exe
# Thêm bộ đếm: \Network Interface(*)\Bytes Total/sec
# Thêm bộ đếm: \TCPv4\Segments/sec
```

## Yêu Cầu

### Yêu Cầu Mạng
- **Kết Nối IP**: Hạ tầng mạng IP chức năng
- **Khả Dụng Cổng**: Cổng mở cho dịch vụ yêu cầu
- **Băng Thông**: Băng thông đầy đủ cho nhu cầu ứng dụng
- **Độ Trễ**: Độ trễ mạng chấp nhận được cho ứng dụng

### Yêu Cầu Phần Cứng
- **Giao Diện Mạng**: Bộ điều hợp mạng tương thích
- **Công Suất Xử Lý**: CPU đủ để xử lý TCP
- **Bộ Nhớ**: RAM đầy đủ cho bộ đệm và kết nối TCP
- **Lưu Trữ**: Lưu trữ cho nhật ký và thống kê mạng

### Yêu Cầu Phần Mềm
- **Ngăn Xếp TCP/IP**: Triển khai TCP/IP hệ điều hành
- **Trình Điều Khiển Mạng**: Trình điều khiển giao diện mạng tương thích
- **Phần Mềm Bảo Mật**: Tường lửa và hệ thống phát hiện xâm nhập
- **Công Cụ Giám Sát**: Công cụ giám sát hiệu suất mạng

## Tối Ưu Hiệu Suất

### Điều Chỉnh Bộ Đệm
- **Bộ Đệm Nhận**: Tối ưu cho mạng độ trễ cao
- **Bộ Đệm Gửi**: Tối ưu cho ứng dụng băng thông cao
- **Mở Rộng Cửa Sổ**: Bật cho mạng tốc độ cao
- **Xác Nhận Chọn Lọc**: Cải thiện hiệu quả gửi lại

### Kiểm Soát Tắc Nghẽn
- **Lựa Chọn Thuật Toán**: Chọn thuật toán kiểm soát tắc nghẽn phù hợp
- **Kiểm Soát Tốc Độ Thích Ứng**: Điều chỉnh động tốc độ truyền
- **Phục Hồi Mất Mát**: Phục hồi hiệu quả từ mất gói
- **Chia Sẻ Công Bằng**: Phân phối băng thông công bằng

### Quản Lý Kết Nối
- **Gom Nhóm Kết Nối**: Tái sử dụng kết nối để giảm chi phí
- **Cài Đặt Giữ Kết Nối**: Tối ưu duy trì kết nối
- **Cấu Hình Thời Gian Chờ**: Thời gian chờ kết nối phù hợp
- **Giới Hạn Tài Nguyên**: Quản lý số lượng kết nối tối đa

## Khắc Phục Sự Cố

### Vấn Đề Phổ Biến
- **Lỗi Kết Nối**: Không thể thiết lập kết nối TCP
- **Suy Giảm Hiệu Suất**: Tốc độ truyền dữ liệu chậm
- **Mất Gói**: Gói dữ liệu bị thiếu hoặc hỏng
- **Tràn Bộ Đệm**: Không đủ không gian bộ đệm cho kết nối
- **Xung Đột Cổng**: Xung đột phân bổ cổng

### Lệnh Chẩn Đoán
```bash
# Kiểm tra kết nối TCP trên ESXi
esxcli network ip connection list | grep tcp

# Xem thống kê mạng
esxtop  # Nhấn 'n' cho chế độ xem mạng

# Kiểm tra sử dụng bộ đệm TCP
esxcli system settings advanced list -o /Net/TcpipHeapSize

# Giám sát hiệu suất TCP trên Linux
ss -tuln
netstat -s | grep -i tcp

# Giám sát TCP trên Windows
netstat -an -p tcp
Get-NetTCPConnection | Where-Object {$_.State -eq "Established"}

# Kiểm tra lỗi mạng
ethtool -S eth0 | grep -i error
```

## Tích Hợp VMware

### Giao Diện Quản Lý
- **Giao Tiếp vCenter**: Kết nối TCP cho quản lý vCenter
- **Truy Cập Khách Web**: Kết nối HTTPS cho giao diện web
- **Truy Cập API**: Kết nối API REST và SOAP
- **Kết Nối Cơ Sở Dữ Liệu**: Giao tiếp cơ sở dữ liệu cho vCenter

### vMotion và Lưu Trữ
- **Lưu Lượng vMotion**: Truyền dữ liệu di chuyển trực tiếp qua TCP
- **Giao Thức Lưu Trữ**: Lưu trữ iSCSI và NFS qua TCP
- **Sao Chép**: Truyền dữ liệu Sao chép vSphere
- **Lưu Lượng Sao Lưu**: Truyền dữ liệu sao lưu

### Mạng Máy Ảo
- **TCP OS Khách**: Ngăn xếp TCP trong hệ điều hành máy ảo
- **Kiểm Soát I/O Mạng**: Ưu tiên lưu lượng TCP
- **Chất Lượng Dịch Vụ**: Quản lý băng thông TCP
- **Bảo Mật**: Giao thức bảo mật dựa trên TCP

## Công Nghệ Liên Quan

- [DNS](/glossary/term/dns.md)
- [NTP](/glossary/term/ntp.md)
- [UDP](/glossary/term/udp.md)
- [ESXi](/glossary/term/esxi.md)
- [vCenter Server](/glossary/term/vcenter.md)
- [Mạng](/glossary/term/network.md)
- [vMotion](/glossary/term/vmotion.md)