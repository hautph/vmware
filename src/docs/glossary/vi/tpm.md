---
term: Trusted Platform Module (TPM)
category: Security
---

Trusted Platform Module (TPM) là một chip bảo mật phần cứng chuyên dụng cung cấp các chức năng mật mã, lưu trữ khóa an toàn và đo lường tính toàn vẹn nền tảng để thiết lập root of trust dựa trên phần cứng cho các hệ thống máy tính. TPM cho phép các hệ thống xác minh tính toàn vẹn của chúng, bảo vệ dữ liệu nhạy cảm và thiết lập các kênh giao tiếp an toàn.

## Tổng Quan

TPM cung cấp:
- Tạo và lưu trữ khóa mật mã dựa trên phần cứng
- Đo lường và chứng thực tính toàn vẹn nền tảng
- Xác thực khởi động an toàn và thực thi
- Bảo vệ chống lại các cuộc tấn công firmware và boot-level
- Tuân thủ các tiêu chuẩn bảo mật ngành

## Tính Năng Chính

### Khả Năng Mật Mã
- **Tạo Khóa**: Tạo khóa RSA và ECC với bảo vệ phần cứng
- **Lưu Trữ An Toàn**: Lưu trữ khóa mã hóa và chứng chỉ chống giả mạo
- **Tạo Số Ngẫu Nhiên**: Tạo số ngẫu nhiên mật mã an toàn
- **Chữ Ký Số**: Tạo và xác minh chữ ký số
- **Hàm Băm**: Các thuật toán băm an toàn (SHA-1, SHA-256, SHA-384, SHA-512)

### Bảo Mật Nền Tảng
- **Khởi Động Đo Lường**: Đo lường và ghi lại các thành phần quy trình khởi động
- **Khởi Động An Toàn**: Xác thực các thành phần khởi động thông qua chữ ký số
- **Thanh Ghi Cấu Hình Nền Tảng (PCRs)**: Lưu trữ các phép đo tính toàn vẹn hệ thống
- **Chứng Thực Từ Xa**: Báo cáo tính toàn vẹn nền tảng cho các hệ thống từ xa
- **Chống Giả Mạo**: Bảo vệ vật lý và logic chống lại việc giả mạo

### Quản Lý Khóa
- **Phân Cấp Khóa**: Quản lý khóa phân cấp với khóa chứng thực, lưu trữ và chứng thực
- **Di Chuyển Khóa**: Di chuyển khóa an toàn giữa các nền tảng đáng tin cậy
- **Sao Lưu Khóa**: Sao lưu và phục hồi khóa mã hóa an toàn
- **Chứng Thực Khóa**: Chứng nhận tính xác thực và toàn vẹn của khóa

## Kiến Trúc

### Thành Phần Phần Cứng
- **Bộ Xử Lý Mật Mã**: Bộ xử lý chuyên dụng cho các hoạt động mật mã
- **Bộ Nhớ An Toàn**: Bộ nhớ chống giả mạo để lưu trữ khóa
- **Giao Diện I/O**: Giao diện để giao tiếp với các thành phần hệ thống
- **Bảo Mật Vật Lý**: Bảo vệ vật lý chống lại việc giả mạo và các cuộc tấn công kênh bên

### Thành Phần Logic
- **Khóa Chứng Thực (EK)**: Khóa bất đối xứng duy nhất được ghi vào TPM trong quá trình sản xuất
- **Khóa Gốc Lưu Trữ (SRK)**: Khóa chính được sử dụng để bọc các khóa khác được lưu trữ trong TPM
- **Khóa Nhận Dạng Chứng Thực (AIK)**: Khóa được sử dụng cho các hoạt động chứng thực
- **Thanh Ghi Cấu Hình Nền Tảng (PCRs)**: Thanh ghi lưu trữ các phép đo tính toàn vẹn

### Chuỗi Tin Cậy
1. **Root of Trust Phần Cứng**: TPM như là root of trust dựa trên phần cứng
2. **Xác Minh Firmware**: Xác minh tính toàn vẹn firmware hệ thống
3. **Xác Thực Trình Khởi Động**: Xác thực chữ ký trình khởi động
4. **Xác Thực Thành Phần OS**: Xác thực các thành phần hệ điều hành
5. **Tin Cậy Ứng Dụng**: Môi trường thực thi đáng tin cậy cho các ứng dụng

## Ví Dụ Cấu Hình

### Cấu Hình Host ESXi
```bash
# Kiểm tra trạng thái TPM trên host ESXi
esxcli system settings advanced list -o /User/TPM/Enable

# Xem thông tin TPM
esxcli system tpm info

# Kiểm tra trạng thái chứng thực TPM
esxcli system tpm attestation get

# Bật TPM (yêu cầu khởi động lại host)
esxcli system settings advanced set -o /User/TPM/Enable -i 1
```

### Cấu Hình PowerCLI
```powershell
# Kiểm tra trạng thái TPM trên nhiều host ESXi
Get-VMHost | Get-AdvancedSetting -Name "User.TPM.Enable"

# Bật TPM trên host ESXi
Get-VMHost "esxi01.domain.com" | New-AdvancedSetting -Name "User.TPM.Enable" -Value 1 -Confirm:$false

# Xem thông tin TPM
Get-VMHost | Get-View | Select-Object Name, TpmPresent, TpmActivated

# Kiểm tra trạng thái chứng thực
Get-VMHost | Get-View | Select-Object Name, TpmAttestationStatus
```

### Cấu Hình Guest OS Windows
```cmd
# Kiểm tra trạng thái TPM trong Windows
wmic /namespace:\\root\cimv2\security\microsofttpm path win32_tpm get *

# Xem thông tin TPM sử dụng PowerShell
Get-WmiObject -Namespace "root\CIMV2\Security\MicrosoftTpm" -Class Win32_Tpm

# Kiểm tra trạng thái TPM sử dụng tpm.msc
# Chạy "tpm.msc" từ menu Start hoặc dòng lệnh

# Xem giá trị PCR
tpm.msc -> TPM Management -> tab PCRs
```

## Yêu Cầu

### Phần Cứng
- **Chip TPM**: Chip TPM 1.2 hoặc TPM 2.0 vật lý trên bo mạch chủ
- **Máy Chủ Tương Thích**: Phần cứng máy chủ với hỗ trợ TPM
- **Firmware UEFI**: Firmware UEFI với hỗ trợ TPM
- **Khởi Động An Toàn**: Khả năng Khởi Động An Toàn để tăng cường bảo mật

### Phần Mềm
- **ESXi 6.5 trở lên**: Host với hỗ trợ TPM
- **vCenter Server**: Quản lý tập trung các host có TPM
- **Hệ Điều Hành Guest Tương Thích**: Hệ điều hành guest với hỗ trợ TPM
- **Giấy Phép Thích Hợp**: vSphere Enterprise Plus hoặc giấy phép thích hợp

### Tương Thích
- **Phiên Bản TPM**: Hỗ trợ cho các đặc tả TPM 1.2 và TPM 2.0
- **Hệ Điều Hành Guest**: Windows, Linux và các hệ điều hành nhận biết TPM khác
- **Cơ Quan Chứng Nhận**: Cấu hình cơ quan chứng nhận thích hợp
- **Kết Nối Mạng**: Kết nối mạng cho chứng thực từ xa

## Chính Sách Bảo Mật

### Chính Sách Chứng Thực
- **Xác Minh Nền Tảng**: Xác minh các phép đo tính toàn vẹn nền tảng
- **Xác Thực Thành Phần Khởi Động**: Xác thực chữ ký các thành phần khởi động
- **Tuân Thủ Cấu Hình**: Tuân thủ các chính sách cấu hình bảo mật
- **Giám Sát Liên Tục**: Giám sát liên tục tính toàn vẹn nền tảng

### Chính Sách Quản Lý Khóa
- **Tạo Khóa**: Chính sách cho việc tạo khóa mật mã
- **Lưu Trữ Khóa**: Chính sách cho việc lưu trữ khóa an toàn
- **Sử Dụng Khóa**: Chính sách cho việc sử dụng và kiểm soát truy cập khóa
- **Vòng Đời Khóa**: Chính sách cho quản lý vòng đời khóa

### Chính Sách Kiểm Soát Truy Cập
- **Xác Thực Người Dùng**: Yêu cầu xác thực cho truy cập TPM
- **Ủy Quyền Ứng Dụng**: Ủy quyền các ứng dụng sử dụng TPM
- **Truy Cập Quản Trị**: Kiểm soát truy cập quản trị cho quản lý TPM
- **Yêu Cầu Kiểm Toán**: Yêu cầu kiểm toán cho các hoạt động TPM

## Thực Hành Tốt Nhất

1. **Lập Kế Hoạch**: Lập kế hoạch triển khai TPM như một phần của kiến trúc bảo mật tổng thể
2. **Lựa Chọn Phần Cứng**: Chọn phần cứng với TPM 2.0 để có các tính năng bảo mật tốt hơn
3. **Quản Lý Chứng Nhận**: Triển khai các quy trình quản lý chứng nhận thích hợp
4. **Giám Sát**: Giám sát các hoạt động TPM và sự kiện bảo mật
5. **Sao Lưu**: Triển khai các quy trình sao lưu cho các hệ thống có TPM
6. **Cập Nhật**: Giữ firmware và phần mềm cập nhật với các bản vá bảo mật
7. **Tài Liệu**: Duy trì tài liệu về cấu hình và chính sách TPM
8. **Tuân Thủ**: Đảm bảo tuân thủ các tiêu chuẩn bảo mật liên quan

## Cải Tiến vSphere 8

### Hỗ Trợ TPM Cải Tiến
- **TPM 2.0 Nâng Cao**: Hỗ trợ tốt hơn cho các tính năng và khả năng TPM 2.0
- **Hiệu Suất Cải Thiện**: Tối ưu hóa các hoạt động TPM với giảm chi phí
- **Tích Hợp Tốt Hơn**: Tích hợp tốt hơn với vSphere Trust Authority
- **Bảo Mật Nâng Cao**: Các thuật toán và giao thức mật mã mạnh hơn

### Chứng Thực Nâng Cao
- **Phép Đo Nâng Cao**: Các phép đo tính toàn vẹn nền tảng chi tiết hơn
- **Báo Cáo Cải Thiện**: Báo cáo và phân tích chứng thực tốt hơn
- **Giám Sát Thời Gian Thực**: Giám sát thời gian thực tính toàn vẹn nền tảng
- **Phản Hồi Tự Động**: Phản hồi tự động cho các vi phạm tính toàn vẹn

### Tính Năng Quản Lý
- **Cấu Hình Đơn Giản Hóa**: Quy trình cấu hình TPM đơn giản hóa
- **PowerCLI Nâng Cao**: Các cmdlet PowerCLI tốt hơn cho quản lý TPM
- **Giám Sát Cải Thiện**: Giám sát và cảnh báo tốt hơn cho các sự kiện TPM
- **Quản Lý Tập Trung**: Quản lý tập trung các host có TPM

## Lệnh Khắc Phục Sự Cố

```bash
# Kiểm tra trạng thái TPM trên host ESXi
esxcli system tpm info

# Xem thông tin chứng thực TPM
esxcli system tpm attestation get

# Kiểm tra log TPM
tail -f /var/log/vmware/vmkernel.log | grep -i tpm

# Xem cài đặt TPM nâng cao
esxcli system settings advanced list -o /User/TPM*

# Kiểm tra sự hiện diện TPM phần cứng
lspci | grep -i tpm

# Xem giá trị PCR
esxcli system tpm pcr get

# Kiểm tra phiên bản firmware TPM
esxcli system tpm info | grep -i version
```

## Công Nghệ Liên Quan

- [Virtual TPM 2.0](/glossary/term/virtual-tpm-2-0.md)
- [Khởi Động An Toàn](/glossary/term/secure-boot.md)
- [vSphere Trust Authority](/glossary/term/vsphere-trust-authority.md)
- [Mã Hóa Máy Ảo](/glossary/term/virtual-machine-encryption.md)
- [ESXi](/glossary/term/esxi.md)