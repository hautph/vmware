---
title: Tạo User và Role cho vCenter trên macOS để sử dụng với Commvault Backup
description: Hướng dẫn chi tiết tạo user và role đặc biệt trên vCenter cho phần mềm Commvault backup trên hệ điều hành macOS
tags: [vmware, vcenter, commvault, backup, powershell, macos]
---

# Tạo User và Role cho vCenter trên macOS để sử dụng với Commvault Backup

Tôi hiểu bạn đang muốn tạo một user và role đặc biệt trên vCenter cho phần mềm Commvault backup, và bạn gặp khó khăn khi thực hiện trên macOS cũng như không rõ cách truyền tham số vào script của Commvault.

Đây là một câu hỏi rất hay và thực tế. Tôi sẽ giải thích chi tiết từng phần và hướng dẫn bạn thực hiện trên macOS.

## Phân tích vấn đề của bạn

1. **Thiếu tham số vCenter:** Bạn đúng rồi, script `CreateCVRole.ps1` không "biết" vCenter của bạn là gì. Bạn phải truyền thông tin này vào cho script thông qua các **tham số (parameters)** khi chạy nó. Tài liệu của Commvault đôi khi không làm rõ, nhưng dựa vào mục đích của script, chúng ta có thể suy luận các tham số cần thiết.

2. **Chạy lệnh trên macOS:** Lệnh `Powershell.exe ...` là dành cho Windows. Trên macOS, bạn sẽ dùng `pwsh` (viết tắt của PowerShell).

---

## Hướng dẫn chi tiết trên macOS

Đây là quy trình đầy đủ từ A-Z trên máy macOS của bạn.

### Bước 1: Cài đặt PowerShell và PowerCLI trên macOS

Nếu bạn chưa cài đặt, bạn cần cài đặt PowerShell Core và module PowerCLI của VMware. Cách dễ nhất là dùng [Homebrew](https://brew.sh/) (một trình quản lý package phổ biến cho macOS).

1. **Mở Terminal** trên macOS.

2. **Cài đặt PowerShell Core:**
   ```bash
   brew install --cask powershell
   ```

3. **Khởi động PowerShell để kiểm tra:**
   ```bash
   pwsh
   ```
   Bạn sẽ thấy dấu nhắc lệnh thay đổi thành `PS ~>`. Bây giờ bạn đã ở trong môi trường PowerShell.

4. **Cài đặt VMware PowerCLI Module:**
   Trong môi trường PowerShell vừa mở, gõ lệnh sau:
   ```powershell
   Install-Module -Name VMware.PowerCLI -Scope CurrentUser
   ```
   Nó có thể hỏi bạn có tin tưởng vào repository (PSGallery) không, hãy gõ `A` (Yes to All) và nhấn Enter.

### Bước 2: Tải xuống các tệp cần thiết từ Commvault

1. Tải tệp script: [CreateCVRole.ps1](https://documentation.commvault.com/v11/commcell-console/files/products/vs_vmware/scripts/CreateCVRole.ps1)

2. Tải tệp định nghĩa quyền: [CVPermissions.txt](https://documentation.commvault.com/v11/commcell-console/files/products/vs_vmware/scripts/CVPermissions.txt)

3. Lưu cả hai tệp này vào cùng một thư mục trên máy Mac của bạn, ví dụ: `/Users/your_username/Documents/Commvault_Scripts/`.

### Bước 3: Kết nối đến vCenter Server bằng PowerCLI

Trước khi chạy script, bạn phải thiết lập một phiên kết nối đến vCenter của mình.

1. Mở Terminal và khởi động PowerShell (`pwsh`).

2. Di chuyển đến thư mục chứa script:
   ```powershell
   cd /Users/your_username/Documents/Commvault_Scripts/
   ```

3. **(Quan trọng) Bỏ qua kiểm tra chứng chỉ SSL:** vCenter của bạn có thể dùng chứng chỉ tự ký. Lệnh bạn tìm thấy `Set-PowerCLIConfiguration` là để làm việc này. Trên macOS, lệnh này vẫn đúng:
   ```powershell
   Set-PowerCLIConfiguration -InvalidCertificateAction Ignore -Scope User
   ```
   Nhấn `Y` để xác nhận.

4. **Kết nối đến vCenter:**
   ```powershell
   Connect-VIServer -Server <vcenter_fqdn_or_ip>
   ```
   Thay `<vcenter_fqdn_or_ip>` bằng địa chỉ vCenter của bạn (ví dụ: `vcenter01.company.local`). PowerShell sẽ yêu cầu bạn nhập tên người dùng và mật khẩu. Hãy dùng tài khoản admin của vCenter (như `administrator@vsphere.local`).

Sau khi chạy lệnh này, tất cả các lệnh PowerCLI tiếp theo trong phiên này sẽ được thực thi trên vCenter bạn vừa kết nối.

### Bước 4: Chạy script `CreateCVRole.ps1` với các tham số đúng

Đây là phần quan trọng nhất để giải quyết thắc mắc của bạn. Dựa vào mục đích của script, nó sẽ cần các tham số sau:

* `-vCenterServer`: Tên vCenter server (mặc dù bạn đã kết nối, một số script vẫn yêu cầu tham số này).
* `-RoleName`: Tên của role bạn muốn tạo (ví dụ: `Commvault-Backup-Role`).
* `-Principal`: Tên của user hoặc group mà bạn muốn gán role này vào (ví dụ: `COMMVAULT\cvbackupuser` hoặc `DOMAIN\commvault_service_account`).
* `-PermissionFile`: Đường dẫn đến tệp `CVPermissions.txt`.

**Cú pháp lệnh đầy đủ sẽ trông như thế này:**

```powershell
./CreateCVRole.ps1 -vCenterServer <vcenter_fqdn_or_ip> -RoleName "Commvault-Backup-Role" -Principal "DOMAIN\commvault_user" -PermissionFile "./CVPermissions.txt"
```

**Giải thích chi tiết:**

* `./`: Trong PowerShell, để chạy một script từ thư mục hiện tại, bạn phải thêm `./` vào trước tên script.
* `-vCenterServer <vcenter_fqdn_or_ip>`: Địa chỉ vCenter của bạn.
* `-RoleName "Commvault-Backup-Role"`: Tên role sẽ được tạo trong vCenter. Bạn có thể đặt tên gì cũng dễ nhớ.
* `-Principal "DOMAIN\commvault_user"`: **Đây là user mà Commvault sẽ dùng để kết nối đến vCenter.** Hãy chắc chắn rằng user này đã tồn tại trong Active Directory của bạn (hoặc local user của vCenter) và bạn nhập đúng định dạng `TÊN_MIỀN\tên_user`.
* `-PermissionFile "./CVPermissions.txt"`: Đường dẫn đến tệp quyền. Vì tệp này nằm cùng thư mục với script, dùng `./` là chính xác nhất.

**Ví dụ thực tế:**

Giả sử vCenter của bạn là `vc.mycorp.local`, user backup là `MYCORP\cvbackup` và bạn muốn đặt tên role là `CV-Role`. Lệnh sẽ là:

```powershell
./CreateCVRole.ps1 -vCenterServer vc.mycorp.local -RoleName "CV-Role" -Principal "MYCORP\cvbackup" -PermissionFile "./CVPermissions.txt"
```

Sau khi chạy lệnh này, script sẽ:

1. Đọc các quyền từ `CVPermissions.txt`.
2. Tạo một role mới tên là `CV-Role` trên vCenter của bạn với tất cả các quyền đó.
3. Gán role `CV-Role` này cho user `MYCORP\cvbackup` ở cấp vCenter root.

### Bước 5: Kiểm tra lại trên vCenter

1. Đăng nhập vào vSphere Web Client bằng tài khoản admin.

2. Vào mục **Administration** -> **Roles**.

3. Bạn sẽ thấy role `CV-Role` (hoặc tên bạn đã đặt) trong danh sách. Nhấp vào nó để xem các quyền được gán.

4. Vào mục **Administration** -> **Global Permissions**.

5. Kiểm tra xem user `MYCORP\cvbackup` đã có role `CV-Role` được gán chưa.

---

## Tóm tắt toàn bộ quy trình trên Terminal macOS

```bash
# 1. Mở Terminal và vào PowerShell
pwsh

# 2. Chuyển đến thư mục chứa script
cd /Users/your_username/Documents/Commvault_Scripts/

# 3. Cấu hình bỏ qua chứng chỉ (chỉ cần làm 1 lần)
Set-PowerCLIConfiguration -InvalidCertificateAction Ignore -Scope User

# 4. Kết nối đến vCenter
Connect-VIServer -Server vc.mycorp.local

# 5. Chạy script để tạo role và gán cho user
./CreateCVRole.ps1 -vCenterServer vc.mycorp.local -RoleName "CV-Role" -Principal "MYCORP\cvbackup" -PermissionFile "./CVPermissions.txt"

# 6. Ngắt kết nối khi hoàn tất (tùy chọn)
Disconnect-VIServer -Server vc.mycorp.local -Confirm:$false
```

## Lưu ý quan trọng khác

* **Execution Policy:** Nếu bạn gặp lỗi về "execution policy" (chính sách thực thi script), hãy chạy lệnh sau để cho phép script chạy:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  ```
  Lệnh này chỉ có hiệu lực trong phiên PowerShell hiện tại.

* **Quyền của User:** User `MYCORP\cvbackup` mà bạn tạo trong Active Directory không cần bất kỳ quyền đặc biệt nào. Toàn bộ quyền của nó trên vCenter sẽ được quyết định bởi role `CV-Role` mà bạn vừa tạo.

Hy vọng hướng dẫn chi tiết này sẽ giúp bạn hoàn thành công việc một cách thuận lợi. Nếu có bất kỳ câu hỏi nào khác, đừng ngần ngại hỏi nhé!