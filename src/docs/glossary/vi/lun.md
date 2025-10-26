---
term: Logical Unit Number (LUN)
category: Storage
language: vi
---

Logical Unit Number (LUN) là một định danh duy nhất được gán cho một đơn vị logic, là một thiết bị hoặc đơn vị chức năng có thể truy cập được thông qua giao thức SCSI (Small Computer System Interface). Trong các hệ thống lưu trữ, LUN được sử dụng để xác định và quản lý các volume logic hoặc thiết bị lưu trữ được trình bày cho các máy chủ hoặc host.

## Tổng quan

LUN cung cấp:
- Tổ chức logic các thiết bị lưu trữ vật lý
- Định danh duy nhất cho các volume lưu trữ
- Lớp trừu tượng giữa lưu trữ vật lý và hệ thống host
- Kiểm soát và quản lý truy cập chi tiết

## Các khái niệm chính

### Ảo hóa lưu trữ
- LUN trừu tượng hóa lưu trữ vật lý thành các đơn vị logic
- Nhiều đĩa vật lý có thể được kết hợp thành một LUN duy nhất
- Cho phép phân bổ và quản lý lưu trữ linh hoạt
- Cung cấp giao diện nhất quán bất kể phần cứng cơ bản

### Kiến trúc SCSI
- Là một phần của lược đồ địa chỉ giao thức SCSI
- Được sử dụng để xác định các mục tiêu và đơn vị logic
- Hỗ trợ lên đến 16.384 LUN trên mỗi mục tiêu
- Là thành phần không thể thiếu trong môi trường SAN (Storage Area Network)

## Các loại LUN

### LUN vật lý
- Ánh xạ trực tiếp đến các thiết bị lưu trữ vật lý
- Mối quan hệ một-một với các đĩa vật lý
- Cung cấp quyền truy cập thiết bị thô
- Phổ biến trong các mảng lưu trữ truyền thống

### LUN ảo
- Các volume logic được trừu tượng hóa
- Có thể trải dài trên nhiều thiết bị vật lý
- Hỗ trợ các tính năng nâng cao như cấp phát mỏng
- Phổ biến trong các hệ thống lưu trữ hiện đại

### LUN cấp phát mỏng
- Lưu trữ được cấp phát theo yêu cầu
- Chỉ tiêu thụ không gian vật lý khi dữ liệu được ghi
- Cải thiện hiệu quả sử dụng lưu trữ
- Cần được giám sát cẩn thận để tránh cấp phát quá mức

## Quản lý LUN

### Tạo và cấu hình
- Xác định kích thước và cấp độ RAID
- Gán các chính sách lưu trữ phù hợp
- Cấu hình kiểm soát truy cập và quyền hạn
- Thiết lập các tham số hiệu suất

### Giám sát và bảo trì
- Theo dõi các chỉ số hiệu suất (IOPS, độ trễ)
- Giám sát mức sử dụng dung lượng
- Thực hiện kiểm tra sức khỏe định kỳ
- Triển khai quy trình sao lưu và khôi phục

## Triển khai VMware vSphere

### Datastore VMFS
- LUN đóng vai trò lưu trữ nền tảng cho datastore VMFS
- Nhiều volume VMFS có thể nằm trên một LUN duy nhất
- Hỗ trợ các kích thước block khác nhau cho các khối lượng công việc khác nhau
- Yêu cầu xác định kích thước phù hợp dựa trên mức sử dụng dự kiến

### RDM (Raw Device Mapping)
- Truy cập trực tiếp đến LUN từ máy ảo
- Hỗ trợ chế độ vật lý (pass-through) và chế độ ảo
- Cho phép các ứng dụng nhận biết SAN truy cập lưu trữ trực tiếp
- Cần thiết cho các kịch bản clustering và replication nhất định

### Chính sách lưu trữ
- Xác định các yêu cầu hiệu suất và khả năng sẵn sàng
- Tự động đặt VM trên các LUN phù hợp
- Cho phép di chuyển động giữa các tầng lưu trữ
- Hỗ trợ các yêu cầu tuân thủ và quản trị

## Các thực hành tốt nhất

1. **Xác định kích thước LUN**: Xác định kích thước LUN phù hợp dựa trên yêu cầu khối lượng công việc và dự báo tăng trưởng
2. **Cách ly hiệu suất**: Tách các khối lượng công việc hiệu suất cao vào các LUN chuyên dụng
3. **Giám sát**: Thường xuyên giám sát các chỉ số hiệu suất LUN bao gồm IOPS, độ trễ và thông lượng
4. **Quy hoạch dung lượng**: Triển khai quản lý dung lượng chủ động để tránh suy giảm hiệu suất
5. **Kiểm soát truy cập**: Áp dụng kiểm soát truy cập phù hợp để ngăn chặn truy cập trái phép vào LUN

## Các lệnh khắc phục sự cố

```bash
# Liệt kê các LUN khả dụng trên host ESXi
esxcli storage core path list

# Xem thông tin chi tiết LUN
esxcli storage vmfs extent list

# Kiểm tra trạng thái kết nối LUN
esxcli storage core device list

# Quét lại các bộ điều hợp lưu trữ
esxcli storage core adapter rescan
```

## Các công nghệ liên quan

- [Lưu trữ](/glossary/term/storage)
- [iSCSI](/glossary/term/iscsi)
- [VMFS](/glossary/term/vmfs)
- [RDM](/glossary/term/rdm)
- [vSAN](/glossary/term/vsan)
- [Storage DRS](/glossary/term/storage-drs)
- [VASA](/glossary/term/vasa)