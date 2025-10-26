---
term: Affinity Rules
category: Resource_Management
language: vi
---

Affinity Rules là các quy tắc trong vSphere Distributed Resource Scheduler (DRS) để điều phối tài nguyên và xác định vị trí chạy của các máy ảo (VM) trên các host trong cluster. Các quy tắc này giúp quản lý cách các VM được phân bố và tương tác với nhau trong môi trường ảo hóa.

## Tổng quan

Affinity Rules có các đặc điểm chính sau:
- Được cấu hình trong DRS cluster
- Xác định mối quan hệ giữa VM và host
- Giúp tối ưu hóa hiệu suất và đáp ứng yêu cầu kinh doanh
- Có hai loại: VM-Host Affinity và VM-VM Affinity

## Cách thức hoạt động

### VM-Host Affinity Rules
Quy tắc VM-Host xác định:
- VM phải chạy trên (Must Run On) hoặc không được chạy trên (Must Not Run On) một nhóm host cụ thể
- Giúp đảm bảo VM chạy trên host có phần cứng phù hợp
- Hỗ trợ các yêu cầu compliance và security

### VM-VM Affinity Rules
Quy tắc VM-VM xác định:
- Các VM phải chạy cùng nhau (Affinity) hoặc không được chạy cùng nhau (Anti-Affinity) trên cùng một host
- Giúp đảm bảo hiệu suất và độ tin cậy
- Hỗ trợ các yêu cầu về fault tolerance

### Rule Evaluation
DRS đánh giá các quy tắc:
- Khi có yêu cầu placement mới
- Khi thực hiện vMotion
- Khi có thay đổi trong cluster
- Ưu tiên các quy tắc theo mức độ quan trọng

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Tạo VM-Host Affinity Rule
New-DRSVMHostRule -Cluster "ProductionCluster" -Name "WebTierRule" -VMGroup "WebVMs" -HostGroup "WebHosts" -Type MustRunOn

# Tạo VM-VM Affinity Rule
New-DRSAffinityRule -Cluster "ProductionCluster" -Name "AppTierAffinity" -VMIds (Get-VM "AppVM1", "AppVM2").Id -Enabled $true -Affine $true

# Xem các quy tắc affinity hiện có
Get-DRSRule -Cluster "ProductionCluster"
```

### CLI Configuration
```bash
# Xem các quy tắc DRS
vim-cmd dasvm/checkVmConfig 123

# Kiểm tra quy tắc affinity
esxcli sched group list

# Xem thông tin cluster rules
vim-cmd vimsvc/task_list | grep -i rule
```

## Các loại Affinity Rules

### VM-Host Affinity Rule
- Buộc VM chạy trên một nhóm host cụ thể
- Ngăn VM chạy trên một nhóm host cụ thể
- Thường được sử dụng với Host Groups

### VM-VM Affinity Rule
- Buộc các VM chạy cùng nhau trên cùng một host
- Hữu ích cho các ứng dụng cần giao tiếp thường xuyên

### VM-VM Anti-Affinity Rule
- Ngăn các VM chạy cùng nhau trên cùng một host
- Tăng độ tin cậy bằng cách phân tán VM

## Các tính năng nâng cao trong vSphere 8

### Enhanced Rule Management
- Cải thiện giao diện quản lý quy tắc
- Hỗ trợ các quy tắc phức tạp hơn
- Tăng hiệu suất đánh giá quy tắc

### Rule Validation
- Kiểm tra xung đột giữa các quy tắc
- Cảnh báo khi quy tắc không thể thực hiện
- Đề xuất giải pháp cho các xung đột

## Thực hành tốt nhất

1. **Planning**: Lên kế hoạch quy tắc trước khi triển khai
2. **Testing**: Kiểm tra quy tắc trong môi trường thử nghiệm
3. **Monitoring**: Theo dõi hiệu quả của các quy tắc
4. **Documentation**: Tài liệu hóa các quy tắc để quản lý

## Lệnh khắc phục sự cố

```bash
# Xem các quy tắc DRS
vim-cmd dasvm/checkVmConfig 123

# Kiểm tra quy tắc affinity
esxcli sched group list

# Xem thông tin cluster rules
vim-cmd vimsvc/task_list | grep -i rule

# Kiểm tra log DRS
tail -f /var/log/vmware/drsmgr/*.log
```

## Công nghệ liên quan

- [DRS (Distributed Resource Scheduler)](/glossary/term/drs.md)
- [vMotion](/glossary/term/vmotion.md)
- [Host Groups](/glossary/term/host-groups)
- [VM Groups](/glossary/term/vm-groups)
- [Cluster](/glossary/term/cluster)