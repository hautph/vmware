---
title: Cài đặt Ansible trên CentOS 9
category: DevOps
excerpt: Hướng dẫn chi tiết cài đặt Ansible trên CentOS 9 Stream
language: vi
---

# Cài đặt Ansible trên CentOS 9

Chào bạn, với vai trò là một **System Admin**, việc cài đặt **Ansible** trên **CentOS 9** khá đơn giản vì Ansible đã có sẵn trong kho lưu trữ của hệ thống. Bạn có thể làm theo các bước dưới đây:

## 🚀 Các Bước Cài Đặt Ansible trên CentOS 9

### 1. Cài đặt Kho lưu trữ EPEL (Extra Packages for Enterprise Linux)

Mặc dù Ansible có thể có sẵn trong kho AppStream mặc định của RHEL 9 (CentOS 9/Stream dựa trên RHEL 9), việc cài đặt EPEL vẫn là một bước thường được khuyến nghị để đảm bảo có thể truy cập các gói bổ sung và phiên bản ổn định hơn.

Chạy lệnh sau:

```bash
sudo dnf install epel-release -y
```

---

### 2. Cài đặt Ansible

Sau khi đã có EPEL (hoặc nếu Ansible đã có sẵn), bạn có thể cài đặt Ansible bằng trình quản lý gói `dnf`.

Chạy lệnh sau:

```bash
sudo dnf install ansible -y
```

Hoặc, bạn có thể cài đặt gói lõi **Ansible-Core** nếu chỉ cần các chức năng cơ bản:

```bash
sudo dnf install ansible-core -y
```

---

### 3. Kiểm tra phiên bản Ansible

Sau khi cài đặt hoàn tất, bạn hãy kiểm tra để xác nhận Ansible đã được cài đặt thành công:

```bash
ansible --version
```

Kết quả sẽ hiển thị phiên bản Ansible và các thông tin cấu hình liên quan.

---

## 🛠️ Cấu hình Cơ bản Sau Cài đặt

Ansible hoạt động theo cơ chế **Agentless** (không cần cài phần mềm agent trên các máy quản lý) và sử dụng **SSH** để kết nối. Bạn cần thực hiện cấu hình cơ bản sau:

### 1. Cấu hình Inventory (Tệp /etc/ansible/hosts)

Đây là nơi bạn khai báo danh sách các máy chủ (Managed Nodes) mà Ansible sẽ quản lý. Mở tệp Inventory mặc định và thêm các máy chủ của bạn vào:

```bash
sudo nano /etc/ansible/hosts
```

Thêm thông tin máy chủ theo nhóm (ví dụ):

```ini
[webservers]
server1.example.com
server2.example.com

[database]
db1.example.com
```

### 2. Cấu hình SSH Key (Được khuyến nghị)

Để Ansible có thể kết nối với các máy chủ mà không cần nhập mật khẩu liên tục, bạn nên thiết lập cặp khóa **SSH Key** (tạo key trên máy Control Node và copy Public Key sang các Managed Nodes).

* **Tạo SSH Key (trên Control Node):**

```bash
ssh-keygen
```

(Nhấn Enter để chấp nhận các giá trị mặc định)

* **Copy Public Key sang Managed Nodes:**

```bash
ssh-copy-id <user>@<ip_hoặc_hostname_của_managed_node>
```

### 3. Kiểm tra kết nối

Sử dụng lệnh `ping` (sử dụng module `ping` của Ansible, không phải lệnh `ping` của hệ điều hành) để kiểm tra kết nối tới tất cả các máy chủ trong Inventory:

```bash
ansible all -m ping
```

Nếu kết quả trả về `SUCCESS` với `pong`, nghĩa là Ansible đã sẵn sàng để quản lý các máy chủ đó.

---

## 🎥 Video Hướng Dẫn

Bạn có thể xem video hướng dẫn cài đặt Ansible trên CentOS 9 Stream để trực quan hơn về quy trình này.

[How to install Ansible in CentOS 9 Stream](https://www.youtube.com/watch?v=TNTwhVEeMUA)