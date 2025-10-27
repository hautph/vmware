---
term: CPU (Central Processing Unit)
category: Hardware
language: vi
---

CPU (Bộ xử lý trung tâm) là thành phần chính của hệ thống máy tính thực thi các lệnh và thực hiện các phép tính cho tất cả các ứng dụng phần mềm và hệ điều hành. Trong môi trường ảo hóa, CPU được chia sẻ giữa nhiều máy ảo thông qua cơ chế lập lịch và phân bổ tài nguyên của hypervisor.

## Tổng Quan

CPU cung cấp:
- Thực thi và xử lý lệnh
- Các phép toán số học và logic
- Quản lý luồng điều khiển
- Di chuyển dữ liệu giữa bộ nhớ và lưu trữ
- Hỗ trợ ảo hóa cho nhiều khối lượng công việc

## Tính Năng Chính

### Khả Năng Xử Lý
- **Kiến Trúc Tập Lệnh**: Hỗ trợ tập lệnh phức tạp (x86, ARM)
- **Tốc Độ Xung Nhịp**: Tần số xử lý được đo bằng GHz
- **Nhân và Luồng**: Nhiều đơn vị xử lý để thực hiện song song
- **Bộ Nhớ Cache**: Bộ nhớ tốc độ cao cho dữ liệu truy cập thường xuyên

### Hỗ Trợ Ảo Hóa
- **Ảo Hóa Hỗ Trợ Phần Cứng**: Hỗ trợ Intel VT-x và AMD-V
- **Hỗ Trợ Nhiều VM**: Thực thi đồng thời nhiều máy ảo
- **Lập Lịch CPU**: Phân bổ CPU dựa trên hypervisor
- **Tối Ưu Hiệu Suất**: Các kỹ thuật như liên kết CPU và đặt chỗ

### Chỉ Số Hiệu Suất
- **Tốc Độ Xung Nhịp**: Tốc độ xử lý tính bằng gigahertz (GHz)
- **Lệnh Mỗi Chu Kỳ (IPC)**: Hiệu quả thực thi lệnh
- **Công Suất Thiết Kế Nhiệt (TDP)**: Tiêu thụ điện năng và phát nhiệt
- **Điểm Hiệu Suất**: Đo lường hiệu suất cho khối lượng công việc cụ thể

## Kiến Trúc

### Thành Phần Cốt Lõi
- **Đơn Vị Điều Khiển**: Quản lý thực thi lệnh và luồng dữ liệu
- **Đơn Vị Logic Số Học (ALU)**: Thực hiện các phép toán toán học và logic
- **Thanh Ghi**: Bộ nhớ tốc độ cao cho dữ liệu và lệnh hoạt động
- **Phân Cấp Cache**: Cache L1, L2 và L3 để tối ưu hiệu suất

### Thiết Kế Đa Nhân
- **Nhân Vật Lý**: Các đơn vị xử lý độc lập trên một chip
- **Nhân Logic**: Hyperthreading cho đa luồng đồng thời
- **Cách Ly Nhân**: Phân tách khối lượng công việc để bảo mật và hiệu suất
- **Giao Tiếp Giữa Nhân**: Chia sẻ dữ liệu hiệu quả giữa các nhân

### Xử Lý Lệnh
- **Tìm Nạp**: Truy xuất lệnh từ bộ nhớ
- **Giải Mã**: Diễn giải yêu cầu lệnh
- **Thực Thi**: Thực hiện các thao tác cần thiết
- **Ghi Trở Lại**: Lưu trữ kết quả vào bộ nhớ hoặc thanh ghi

## Ảo Hóa trong VMware

### Ảo Hóa CPU
- **Trình Lập Lịch VMkernel**: Cơ chế lập lịch CPU của ESXi
- **Liên Kết CPU**: Ràng buộc VM với các nhân vật lý cụ thể
- **Đặt Chỗ CPU**: Phân bổ CPU tối thiểu được đảm bảo
- **Giới Hạn CPU**: Hạn chế sử dụng CPU tối đa

### Quản Lý Tài Nguyên
- **Chia Sẻ CPU**: Phân bổ tài nguyên dựa trên ưu tiên
- **Thời Gian Sẵn Sàng CPU**: Thời gian VM chờ tài nguyên CPU
- **Cam Kết CPU**: Chạy nhiều vCPU hơn số nhân vật lý
- **Cấu Trúc NUMA**: Tối ưu hóa Truy Cập Bộ Nhớ Không Đồng Nhất

### Giám Sát Hiệu Suất
- **ESXTOP**: Phân tích hiệu suất CPU thời gian thực
- **Biểu Đồ Hiệu Suất vCenter**: Dữ liệu sử dụng CPU lịch sử
- **Chỉ Số Sử Dụng CPU**: Phần trăm sử dụng CPU theo thời gian
- **Phân Tích Hàng Chờ Sẵn Sàng**: Thời gian chờ CPU của VM

## Ví Dụ Cấu Hình

### Cấu Hình CPU ESXi
```bash
# Xem thông tin CPU
esxcli hardware cpu list

# Kiểm tra cài đặt trình lập lịch CPU
esxcli system settings advanced list -o /Scheduler/

# Xem cấu trúc NUMA
esxcli hardware numa node list

# Kiểm tra quản lý điện năng CPU
esxcli system settings advanced list -o /Power/CpuPolicy
```

### Quản Lý CPU PowerCLI
```powershell
# Xem thông tin CPU cho host ESXi
Get-VMHost | Select Name, CpuTotalMhz, CpuUsedMHz

# Đặt chỗ CPU cho VM
Get-VM "MyVM" | New-AdvancedSetting -Name "sched.cpu.min" -Value 1000 -Confirm:$false

# Cấu hình giới hạn CPU cho VM
Get-VM "MyVM" | New-AdvancedSetting -Name "sched.cpu.max" -Value 2000 -Confirm:$false

# Đặt chia sẻ CPU cho VM
Get-VM "MyVM" | Get-View | Select-Object Name, @{N="CpuShares";E={$_.Config.CpuAllocation.Shares.Shares}}
```

## Yêu Cầu

### Phần Cứng
- **Bộ Xử Lý Tương Thích**: Bộ xử lý Intel hoặc AMD với hỗ trợ ảo hóa
- **Số Nhân Tối Thiểu**: Đủ nhân cho yêu cầu khối lượng công việc
- **Tốc Độ Xung Nhịp**: GHz phù hợp cho nhu cầu hiệu suất
- **Kích Thước Cache**: Cache đầy đủ để tối ưu hóa khối lượng công việc

### Phần Mềm
- **ESXi 6.5 trở lên**: Host với hỗ trợ ảo hóa CPU
- **vCenter Server**: Quản lý tài nguyên CPU tập trung
- **VMware Tools**: Tối ưu hóa hệ điều hành khách cho sử dụng CPU
- **Giấy Phép Thích Hợp**: Giấy phép vSphere cho tài nguyên CPU

### Tương Thích
- **Thế Hệ Bộ Xử Lý**: Hỗ trợ cho các thế hệ CPU khác nhau
- **Tập Lệnh**: Tương thích với tập lệnh yêu cầu
- **Tính Năng Ảo Hóa**: Hỗ trợ cho ảo hóa hỗ trợ phần cứng
- **Quản Lý Điện Năng**: Tương thích với tính năng quản lý điện năng CPU

## Thực Hành Tốt Nhất

1. **Định Kích Thước Đúng**: Định kích thước tài nguyên CPU phù hợp cho khối lượng công việc
2. **Giám Sát**: Thường xuyên giám sát sử dụng CPU và hiệu suất
3. **Quản Lý Đặt Chỗ**: Sử dụng đặt chỗ một cách hợp lý để tránh lãng phí tài nguyên
4. **Nhận Thức NUMA**: Cân nhắc cấu trúc NUMA để tối ưu hiệu suất
5. **Cam Kết**: Tránh cam kết CPU quá mức
6. **Quy Tắc Liên Kết**: Chỉ sử dụng liên kết CPU khi cần thiết
7. **Quản Lý Điện Năng**: Cấu hình chính sách điện năng CPU phù hợp

## Cải Tiến vSphere 8

### Cải Thiện Hiệu Suất CPU
- **Trình Lập Lịch Nâng Cao**: Thuật toán lập lịch CPU cải tiến
- **Hỗ Trợ NUMA Tốt Hơn**: Xử lý cấu trúc NUMA nâng cao
- **Giảm Chi Phí**: Chi phí ảo hóa thấp hơn cho hoạt động CPU
- **Khả Năng Mở Rộng Cải Thiện**: Hiệu suất tốt hơn với bộ xử lý nhiều nhân

### Cải Thiện Bảo Mật
- **Vùng An Toàn**: Bảo mật nâng cao cho hoạt động CPU
- **Mã Hóa Bộ Nhớ**: Hỗ trợ mã hóa bộ nhớ dựa trên phần cứng
- **Bảo Vệ Kênh Bên**: Giảm thiểu cho các cuộc tấn công kênh bên CPU
- **Chứng Thực**: Chứng thực và xác minh CPU tốt hơn

### Tính Năng Quản Lý
- **Giám Sát Nâng Cao**: Giám sát hiệu suất CPU nâng cao
- **Tối Ưu Hóa Tự Động**: Tối ưu hóa tài nguyên CPU tự động
- **Khắc Phục Sự Cố Cải Thiện**: Công cụ tốt hơn để phân tích hiệu suất CPU
- **Cấu Hình Đơn Giản Hóa**: Quy trình cấu hình CPU đơn giản hóa

## Lệnh Khắc Phục Sự Cố

```bash
# Kiểm tra thông tin CPU
esxcli hardware cpu list

# Xem sử dụng CPU
esxtop  # Nhấn '1' để xem thông tin CPU cụ thể

# Kiểm tra cài đặt trình lập lịch CPU
esxcli system settings advanced list -o /Scheduler/

# Xem cấu trúc NUMA
esxcli hardware numa node list

# Kiểm tra quản lý điện năng CPU
esxcli system settings advanced list -o /Power/CpuPolicy

# Xem thời gian sẵn sàng CPU cho VM
vim-cmd vmsvc/get.summary <vmid> | grep -i cpu

# Kiểm tra vấn đề hiệu suất CPU
tail -f /var/log/vmkernel.log | grep -i cpu
```

## Công Nghệ Liên Quan

- [ESXi](/glossary/term/esxi.md)
- [vSphere](/glossary/term/vsphere.md)
- [Quản Lý Tài Nguyên](/glossary/term/resource-management.md)
- [NUMA](/glossary/term/numa.md)
- [vCPU](/glossary/term/vcpu.md)
- [pCPU](/glossary/term/pcpu.md)