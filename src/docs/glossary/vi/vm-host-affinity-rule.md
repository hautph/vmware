---
term: VM-Host Affinity Rule
category: Resource_Management
language: vi
---

VM-Host Affinity Rule là một loại quy tắc trong vSphere Distributed Resource Scheduler (DRS) buộc các máy ảo (VM) phải chạy trên hoặc không được chạy trên một nhóm host cụ thể trong cluster. Quy tắc này giúp đảm bảo các yêu cầu về phần cứng, compliance và hiệu suất cho các VM.

## Tổng quan

VM-Host Affinity Rule có các đặc điểm chính sau:
- Là một phần của DRS Affinity Rules
- Xác định mối quan hệ giữa VM và host
- Có hai loại: Must Run On và Must Not Run On
- Giúp tối ưu hóa việc phân bố VM theo yêu cầu kinh doanh

## Cách thức hoạt động

### Must Run On Rule
Quy tắc "Must Run On":
- Buộc VM chỉ được chạy trên một nhóm host cụ thể
- VM không thể chạy trên các host khác ngoài nhóm được chỉ định
- Hữu ích khi VM yêu cầu phần cứng đặc biệt

### Must Not Run On Rule
Quy tắc "Must Not Run On":
- Ngăn VM chạy trên một nhóm host cụ thể
- VM chỉ có thể chạy trên các host không thuộc nhóm được chỉ định
- Hữu ích để tránh các host có vấn đề hoặc không đủ tài nguyên

### Rule Evaluation
DRS đánh giá quy tắc:
- Khi có yêu cầu placement mới
- Khi thực hiện vMotion
- Khi có thay đổi trong cluster
- Ưu tiên các quy tắc theo mức độ quan trọng

## Cấu hình mẫu

### PowerShell/PowerCLI Configuration
```powershell
# Tạo VM-Host Affinity Rule - Must Run On
New-DRSVMHostRule -Cluster "ProductionCluster" -Name "DatabaseRule" -VMGroup "DatabaseVMs" -HostGroup "DatabaseHosts" -Type MustRunOn

# Tạo VM-Host Affinity Rule - Must Not Run On
New-DRSVMHostRule -Cluster "ProductionCluster" -Name "RestrictedRule" -VMGroup "AppVMs" -HostGroup "MaintenanceHosts" -Type MustNotRunOn

# Xem các quy tắc VM-Host affinity hiện có
Get-DRSVMHostRule -Cluster "ProductionCluster"
```

### CLI Configuration
```bash
# Xem các quy tắc DRS
vim-cmd dasvm/checkVmConfig 123

# Kiểm tra quy tắc VM-Host affinity
esxcli sched group list

# Xem thông tin cluster rules
vim-cmd vimsvc/task_list | grep -i rule
```

## Các tình huống sử dụng

### Hardware Requirements
- VM yêu cầu phần cứng đặc biệt (GPU, HBA, v.v.)
- VM cần sử dụng local storage
- VM cần truy cập vào thiết bị PCI passthrough

### Compliance Requirements
- VM cần chạy trên host được chứng nhận
- VM cần chạy trên host có tính năng bảo mật đặc biệt
- VM cần chạy trên host theo quy định của tổ chức

### Performance Optimization
- VM cần chạy trên host có tài nguyên dư thừa
- VM cần tránh các host có tải cao
- VM cần chạy trên host gần storage hoặc network

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

# Kiểm tra quy tắc VM-Host affinity
esxcli sched group list

# Xem thông tin cluster rules
vim-cmd vimsvc/task_list | grep -i rule

# Kiểm tra log DRS
tail -f /var/log/vmware/drsmgr/*.log
```

## Công nghệ liên quan

- [Affinity Rules](/glossary/term/affinity-rules.md)
- [VM-VM Affinity Rule](/glossary/term/vm-vm-affinity-rule.md)
- [VM-VM Anti-Affinity Rule](/glossary/term/vm-vm-anti-affinity-rule.md)
- [DRS (Distributed Resource Scheduler)](/glossary/term/drs.md)
- [Host Groups](/glossary/term/host-groups)
- [VM Groups](/glossary/term/vm-groups)