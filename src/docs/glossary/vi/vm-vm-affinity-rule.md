---
term: VM-VM Affinity Rule
category: Resource_Management
language: vi
---

VM-VM Affinity Rule là một loại quy tắc trong vSphere Distributed Resource Scheduler (DRS) buộc các máy ảo (VM) phải chạy cùng nhau trên cùng một host trong cluster. Quy tắc này giúp tối ưu hóa hiệu suất bằng cách giảm độ trễ mạng giữa các VM có liên quan chặt chẽ với nhau.

## Tổng quan

VM-VM Affinity Rule có các đặc điểm chính sau:
- Là một phần của DRS Affinity Rules
- Buộc các VM được chỉ định chạy trên cùng một host
- Giúp giảm độ trễ mạng và cải thiện hiệu suất
- Phù hợp cho các ứng dụng có giao tiếp thường xuyên

## Cách thức hoạt động

### Affinity Rule
Quy tắc Affinity:
- Buộc các VM được chỉ định chạy trên cùng một host
- Giảm độ trễ mạng giữa các VM
- Cải thiện hiệu suất cho các ứng dụng phân tán

### Rule Evaluation
DRS đánh giá quy tắc:
- Khi có yêu cầu placement mới
- Khi thực hiện vMotion
- Khi có thay đổi trong cluster
- Ưu tiên các quy tắc theo mức độ quan trọng

### Placement Constraints
- DRS phải tìm host có đủ tài nguyên cho tất cả VM trong nhóm
- Nếu không có host phù hợp, quy tắc có thể không được thực hiện
- Có thể xung đột với các quy tắc khác

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Tạo VM-VM Affinity Rule
New-DRSAffinityRule -Cluster "ProductionCluster" -Name "AppTierAffinity" -VMIds (Get-VM "AppVM1", "AppVM2", "AppVM3").Id -Enabled $true -Affine $true

# Xem các quy tắc VM-VM affinity hiện có
Get-DRSAffinityRule -Cluster "ProductionCluster" | Where-Object {$_.Affine -eq $true}

# Cập nhật quy tắc affinity
Get-DRSAffinityRule -Cluster "ProductionCluster" -Name "AppTierAffinity" | Set-DRSAffinityRule -Enabled $true
```

### CLI Configuration
```bash
# Xem các quy tắc DRS
vim-cmd dasvm/checkVmConfig 123

# Kiểm tra quy tắc VM-VM affinity
esxcli sched group list

# Xem thông tin cluster rules
vim-cmd vimsvc/task_list | grep -i rule
```

## Các tình huống sử dụng

### Application Tiering
- Các thành phần của ứng dụng (web, app, database) cần giao tiếp thường xuyên
- Giảm độ trễ mạng giữa các tier
- Cải thiện hiệu suất tổng thể của ứng dụng

### Shared Memory Applications
- Ứng dụng sử dụng shared memory giữa các process
- Cần chạy trên cùng host để truy cập shared memory
- Giảm độ phức tạp trong việc quản lý shared resources

### Licensing Requirements
- Ứng dụng có license theo host
- Cần chạy các VM liên quan trên cùng host để tối ưu license
- Giảm chi phí license

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

1. **Application Analysis**: Phân tích yêu cầu giao tiếp của ứng dụng
2. **Resource Planning**: Đảm bảo host có đủ tài nguyên cho các VM trong nhóm
3. **Monitoring**: Theo dõi hiệu quả của các quy tắc
4. **Conflict Resolution**: Giải quyết xung đột giữa các quy tắc

## Lệnh khắc phục sự cố

```bash
# Xem các quy tắc DRS
vim-cmd dasvm/checkVmConfig 123

# Kiểm tra quy tắc VM-VM affinity
esxcli sched group list

# Xem thông tin cluster rules
vim-cmd vimsvc/task_list | grep -i rule

# Kiểm tra log DRS
tail -f /var/log/vmware/drsmgr/*.log
```

## Công nghệ liên quan

- [Affinity Rules](/glossary/term/affinity-rules.md)
- [VM-Host Affinity Rule](/glossary/term/vm-host-affinity-rule.md)
- [VM-VM Anti-Affinity Rule](/glossary/term/vm-vm-anti-affinity-rule.md)
- [DRS (Distributed Resource Scheduler)](/glossary/term/drs.md)
- [vMotion](/glossary/term/vmotion.md)