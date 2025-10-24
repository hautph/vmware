---
term: VM-VM Anti-Affinity Rule
category: Resource_Management
language: vi
---

VM-VM Anti-Affinity Rule là một loại quy tắc trong vSphere Distributed Resource Scheduler (DRS) ngăn chặn các máy ảo (VM) chạy cùng nhau trên cùng một host trong cluster. Quy tắc này giúp tăng độ tin cậy và khả năng sẵn sàng bằng cách đảm bảo các VM quan trọng được phân tán trên nhiều host khác nhau.

## Tổng quan

VM-VM Anti-Affinity Rule có các đặc điểm chính sau:
- Là một phần của DRS Affinity Rules
- Ngăn các VM được chỉ định chạy trên cùng một host
- Giúp tăng độ tin cậy và fault tolerance
- Phù hợp cho các VM quan trọng cần được phân tán

## Cách thức hoạt động

### Anti-Affinity Rule
Quy tắc Anti-Affinity:
- Ngăn các VM được chỉ định chạy trên cùng một host
- Tăng fault tolerance bằng cách phân tán VM
- Giảm tác động của host failure

### Rule Evaluation
DRS đánh giá quy tắc:
- Khi có yêu cầu placement mới
- Khi thực hiện vMotion
- Khi có thay đổi trong cluster
- Ưu tiên các quy tắc theo mức độ quan trọng

### Placement Constraints
- DRS phải tìm host khác nhau cho các VM trong nhóm
- Nếu không có đủ host, quy tắc có thể không được thực hiện
- Có thể xung đột với các quy tắc affinity khác

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Tạo VM-VM Anti-Affinity Rule
New-DRSAffinityRule -Cluster "ProductionCluster" -Name "DatabaseAntiAffinity" -VMIds (Get-VM "DBPrimary", "DBSecondary").Id -Enabled $true -Affine $false

# Xem các quy tắc VM-VM anti-affinity hiện có
Get-DRSAffinityRule -Cluster "ProductionCluster" | Where-Object {$_.Affine -eq $false}

# Cập nhật quy tắc anti-affinity
Get-DRSAffinityRule -Cluster "ProductionCluster" -Name "DatabaseAntiAffinity" | Set-DRSAffinityRule -Enabled $true
```

### CLI Configuration
```bash
# Xem các quy tắc DRS
vim-cmd dasvm/checkVmConfig 123

# Kiểm tra quy tắc VM-VM anti-affinity
esxcli sched group list

# Xem thông tin cluster rules
vim-cmd vimsvc/task_list | grep -i rule
```

## Các tình huống sử dụng

### High Availability
- Các VM trong cùng một ứng dụng cần được phân tán
- Giảm tác động của host failure
- Tăng uptime của ứng dụng

### Database Replication
- Primary và Secondary database cần chạy trên host khác nhau
- Ngăn cả hai database bị ảnh hưởng bởi cùng một host failure
- Đảm bảo tính sẵn sàng của dữ liệu

### Load Balancer Pairs
- Các load balancer cần được phân tán
- Tránh single point of failure
- Tăng độ tin cậy của dịch vụ

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

1. **Redundancy Planning**: Lên kế hoạch phân tán VM theo yêu cầu redundancy
2. **Host Count**: Đảm bảo có đủ host để thực hiện quy tắc
3. **Monitoring**: Theo dõi hiệu quả của các quy tắc
4. **Conflict Resolution**: Giải quyết xung đột giữa các quy tắc

## Lệnh khắc phục sự cố

```bash
# Xem các quy tắc DRS
vim-cmd dasvm/checkVmConfig 123

# Kiểm tra quy tắc VM-VM anti-affinity
esxcli sched group list

# Xem thông tin cluster rules
vim-cmd vimsvc/task_list | grep -i rule

# Kiểm tra log DRS
tail -f /var/log/vmware/drsmgr/*.log
```

## Công nghệ liên quan

- [Affinity Rules](/glossary/term/affinity-rules)
- [VM-Host Affinity Rule](/glossary/term/vm-host-affinity-rule)
- [VM-VM Affinity Rule](/glossary/term/vm-vm-affinity-rule)
- [DRS (Distributed Resource Scheduler)](/glossary/term/drs)
- [vMotion](/glossary/term/vmotion)
- [High Availability](/glossary/term/high-availability)