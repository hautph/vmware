---
term: Snapshot
category: Backup_Disaster_Recovery
language: vi
---

Snapshot là bản sao thời điểm cụ thể của trạng thái đĩa máy ảo, ghi lại dữ liệu và cấu hình của VM tại một thời điểm nhất định, cho phép khôi phục nhanh chóng về trạng thái đó để sao lưu, kiểm thử hoặc quay lại phiên bản trước.

## Tổng quan

Snapshot cung cấp cơ chế để:
- Bảo tồn trạng thái và dữ liệu chính xác của máy ảo tại một thời điểm cụ thể
- Tạo các điểm khôi phục trước khi thực hiện thay đổi hoặc cập nhật
- Cho phép quay lại trạng thái trước đó nhanh chóng nếu xảy ra sự cố
- Hỗ trợ các kịch bản kiểm thử và phát triển mà không ảnh hưởng đến dữ liệu sản xuất
- Hỗ trợ các hoạt động sao lưu nhất quán với ứng dụng

## Cách thức hoạt động của Snapshot

### Các thành phần của Snapshot
Một snapshot VMware bao gồm các thành phần chính:
- **Tệp Snapshot (.vmsn)**: Chứa cấu hình và trạng thái của VM
- **Tệp Bộ nhớ (.vmem)**: Bảo tồn trạng thái bộ nhớ của VM (nếu snapshot bộ nhớ được bật)
- **Đĩa Delta (.vmdk)**: Lưu trữ các thay đổi đối với đĩa ảo sau khi snapshot được thực hiện
- **Tệp Cấu hình Snapshot (.vmsd)**: Duy trì siêu dữ liệu và mối quan hệ snapshot

### Quy trình Snapshot
1. **Tạo**: Khi snapshot được thực hiện, đĩa ảo hiện tại trở thành chỉ đọc
2. **Tạo Đĩa Delta**: Một đĩa delta mới được tạo để ghi lại tất cả các thao tác ghi trong tương lai
3. **Bảo tồn Trạng thái**: Bộ nhớ và cấu hình VM được lưu (nếu được chỉ định)
4. **Liên kết**: Snapshot được liên kết với chuỗi snapshot của VM

### Chuỗi Snapshot
Snapshot tạo thành một chuỗi trong đó:
- Mỗi snapshot tham chiếu đến trạng thái đĩa trước đó
- Các thay đổi được ghi vào đĩa delta trên cùng
- Nhiều snapshot tạo thành cấu trúc dạng cây
- Việc xóa yêu cầu hợp nhất các đĩa delta

## Các loại Snapshot

### Snapshot Bộ nhớ
- Ghi lại cả trạng thái đĩa và bộ nhớ
- Cho phép khôi phục về trạng thái chạy chính xác
- Yêu cầu nhiều không gian lưu trữ hơn và thời gian tạo lâu hơn
- Lý tưởng cho các trạng thái ứng dụng quan trọng

### Snapshot Đã Im lặng
- Sử dụng VMware Tools để tạm dừng ứng dụng trước khi snapshot
- Đảm bảo ghi lại dữ liệu nhất quán với ứng dụng
- Yêu cầu VMware Tools được cài đặt và chạy
- Được khuyến nghị cho máy chủ cơ sở dữ liệu và ứng dụng

### Snapshot Chỉ Đĩa
- Chỉ ghi lại trạng thái đĩa, không ghi bộ nhớ
- Nhanh hơn để tạo và yêu cầu ít lưu trữ hơn
- VM sẽ khởi động sau khi khôi phục
- Phù hợp cho máy chủ tệp và khối lượng công việc cơ bản

## Quản lý Snapshot

### Tạo Snapshot
```powershell
# PowerCLI để tạo snapshot VM toàn diện
Get-VM "ProductionVM" | New-Snapshot -Name "Truoc-Ban-2025-10" -Description "Truoc khi ap dung ban cap nhat thang 10 nam 2025" -Memory -Quiesce

# Tạo snapshot cho nhiều VM
Get-VM "WebServer01", "AppServer01", "DBServer01" | New-Snapshot -Name "Truoc-Bao-Tri" -Description "Truoc cua so bao tri du kien" -Memory
```

### Quản lý Snapshot qua CLI
```bash
# Liệt kê snapshot cho một VM
vim-cmd vmsvc/snapshot.get VM_ID

# Tạo snapshot bằng vim-cmd
vim-cmd vmsvc/snapshot.create VM_ID "Ten-Snapshot" "Mo ta" 1 1

# Xóa tất cả snapshot
vim-cmd vmsvc/snapshot.removeall VM_ID
```

### Cấu hình Snapshot
```ini
# Cấu hình snapshot nâng cao trong tệp vmx
snapshot.maxSnapshots = "32"
snapshot.disable = "FALSE"
snapshot.disk units = "GB"
snapshot.createWithMemory = "true"
```

## Thực hành tốt nhất

### Tạo Snapshot
1. **Giới hạn Số lượng Snapshot**: Giữ số lượng snapshot ở mức tối thiểu (tối đa 32 mỗi VM)
2. **Giám sát Sử dụng Lưu trữ**: Thường xuyên kiểm tra tiêu thụ không gian đĩa snapshot
3. **Sử dụng Tên Mô tả**: Tạo tên và mô tả snapshot có ý nghĩa
4. **Lên lịch Xóa**: Lên kế hoạch xóa snapshot sau khi xác thực

### Lưu trữ Snapshot
1. **Giới hạn Thời gian**: Xóa snapshot trong vòng 72 giờ sau khi tạo
2. **Xác thực Mục đích**: Đảm bảo snapshot phục vụ mục đích cụ thể
3. **Kiểm tra Định kỳ**: Định kỳ xem xét danh mục snapshot
4. **Giám sát Lưu trữ**: Triển khai cảnh báo cho sự tăng trưởng snapshot

### Xem xét Hiệu suất
1. **Tránh Sử dụng Dài hạn**: Snapshot không phải là sao lưu và không nên là vĩnh viễn
2. **Giảm Độ sâu Chuỗi**: Giữ chuỗi snapshot nông để có hiệu suất tốt hơn
3. **Giám sát Hợp nhất**: Theo dõi các quy trình hợp nhất snapshot
4. **Tác động I/O**: Hiểu tác động hiệu suất của snapshot trên VM sản xuất

## Các thao tác Snapshot

### Tạo Snapshot
```powershell
# Tạo snapshot nâng cao với xử lý lỗi
try {
    $snapshot = Get-VM "CriticalVM" | New-Snapshot -Name "Truoc-Cap-nhat-$(Get-Date -Format 'yyyyMMdd-HHmm')" -Description "Truoc khi ap dung cap nhat quan trong" -Memory -Quiesce -Confirm:$false
    Write-Host "Snapshot da tao thanh cong: $($snapshot.Name)"
} catch {
    Write-Error "Khong the tao snapshot: $($_.Exception.Message)"
}
```

### Quản lý Snapshot
```powershell
# Liệt kê tất cả snapshot cho một VM
Get-VM "ProductionVM" | Get-Snapshot | Select Name, Created, Description, SizeGB

# Xóa snapshot cũ hơn 3 ngày
Get-VM "ProductionVM" | Get-Snapshot | Where-Object {$_.Created -lt (Get-Date).AddDays(-3)} | Remove-Snapshot -Confirm:$false

# Hợp nhất snapshot
Get-VM "ProductionVM" | Get-Snapshot | Remove-Snapshot -RemoveChildren -Confirm:$false
```

### Khôi phục Snapshot
```powershell
# Quay lại snapshot cụ thể
Get-VM "ProductionVM" | Get-Snapshot -Name "Truoc-Ban-2025-10" | Set-VM -Snapshot -Confirm:$false

# Quay lại snapshot mới nhất
Get-VM "ProductionVM" | Set-VM -ToLastSnapshot -Confirm:$false
```

## Cải tiến vSphere 8

### Quản lý Snapshot Nâng cao
- **Hiệu suất Cải thiện**: Tối ưu hóa các thao tác snapshot để có hiệu suất VM tốt hơn
- **Giám sát Nâng cao**: Khả năng hiển thị tốt hơn về tiêu thụ lưu trữ snapshot
- **Hợp nhất Đơn giản**: Quy trình hợp nhất snapshot nhanh hơn
- **Quản lý Dựa trên Chính sách**: Chính sách snapshot tích hợp với vSphere Lifecycle Manager

### Tích hợp Quản lý Hiện đại
- **Quản lý Vòng đời**: Tích hợp tốt hơn với vSphere Lifecycle Manager
- **Tự động hóa Dựa trên Chính sách**: Quản lý snapshot tự động dựa trên chính sách
- **Hoạt động Đơn giản**: Các thao tác snapshot đơn giản trong UI hiện đại
- **Khắc phục sự cố Cải thiện**: Khả năng chẩn đoán tốt hơn cho các vấn đề snapshot

## Khắc phục sự cố

### Các vấn đề phổ biến
1. **Lỗi Hợp nhất Snapshot**: Kiểm tra không gian lưu trữ đủ và quyền truy cập
2. **Giảm Hiệu suất**: Giám sát độ sâu chuỗi snapshot và I/O đĩa
3. **Lỗi Tạo Snapshot**: Xác minh trạng thái VMware Tools và khả năng im lặng
4. **Cạn kiệt Không gian Lưu trữ**: Triển khai giám sát cho sử dụng đĩa snapshot

### Lệnh Chẩn đoán
```bash
# Kiểm tra trạng thái snapshot
vim-cmd vmsvc/snapshot.get VM_ID

# Xem cấu hình VM
vim-cmd vmsvc/get.config VM_ID

# Kiểm tra sử dụng lưu trữ
df -h /vmfs/volumes/ten_datastore/

# Giám sát hợp nhất snapshot
tail -f /var/log/vmkernel.log | grep -i consolidate
```

### Giám sát Hiệu suất
```powershell
# Giám sát sự tăng trưởng kích thước snapshot
Get-VM "ProductionVM" | Get-Snapshot | Select Name, Created, @{N="SizeGB";E={[math]::Round($_.SizeGB, 2)}}

# Kiểm tra trạng thái hợp nhất snapshot
Get-VM | Get-Snapshot | Where-Object {$_.Name -like "*Consolidate*"}
```

## Xem xét Bảo mật

### Kiểm soát Truy cập
- **Quyền dựa trên Vai trò**: Hạn chế các thao tác snapshot cho người dùng được ủy quyền
- **Nhật ký Kiểm toán**: Bật ghi nhật ký cho việc tạo và xóa snapshot
- **Bảo vệ Dữ liệu**: Đảm bảo snapshot không tiết lộ dữ liệu nhạy cảm

### Mã hóa
- **Mã hóa VM**: Snapshot của VM được mã hóa vẫn giữ nguyên mã hóa
- **Mã hóa Lưu trữ**: Cân nhắc mã hóa khi lưu trữ cho lưu trữ snapshot
- **Bảo mật Truyền tải**: Bảo mật các thao tác snapshot qua mạng

## Hạn chế và Xem xét

### Hạn chế Kỹ thuật
- **Snapshot Tối đa**: Giới hạn 32 snapshot mỗi máy ảo
- **Chi phí Lưu trữ**: Snapshot có thể tiêu thụ không gian đĩa đáng kể
- **Tác động Hiệu suất**: Chuỗi snapshot sâu có thể làm giảm hiệu suất VM
- **Tích hợp Sao lưu**: Snapshot không phải là sự thay thế cho các giải pháp sao lưu phù hợp

### Xem xét Hoạt động
- **Không dành cho Lưu trữ Dài hạn**: Snapshot nên là tạm thời
- **Nhất quán Ứng dụng**: Yêu cầu VMware Tools để im lặng
- **Chính sách Hỗ trợ**: Một số nhà cung cấp có thể không hỗ trợ VM có snapshot
- **Tác động Nhân bản**: Snapshot có thể ảnh hưởng đến các quy trình nhân bản

## Các công nghệ liên quan

- [vSphere Replication](/glossary/term/vsphere-replication.md)
- [Site Recovery Manager](/glossary/term/site-recovery-manager.md)
- [vSphere Data Protection](/glossary/term/vsphere-data-protection.md)
- [Backup & Disaster Recovery](/glossary/term/backup-disaster-recovery.md)