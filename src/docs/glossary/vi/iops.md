---
term: IOPS (Input/Output Operations Per Second)
category: Storage
language: vi
---

IOPS (Input/Output Operations Per Second - Số thao tác nhập/xuất mỗi giây) là phép đo hiệu suất được sử dụng để mô tả các thiết bị và hệ thống lưu trữ máy tính. IOPS đại diện cho số lượng thao tác đọc và ghi có thể hoàn thành trong mỗi giây, cung cấp một chỉ số tiêu chuẩn hóa để so sánh hiệu suất lưu trữ giữa các công nghệ và cấu hình khác nhau.

## Tổng quan

IOPS đo lường:
- Khả năng thông lượng của hệ thống lưu trữ
- Hiệu suất dưới các mẫu khối lượng công việc khác nhau
- Hiệu quả của các hệ thống con lưu trữ
- Hiệu suất tương đối giữa các giải pháp lưu trữ khác nhau

## Các yếu tố chính ảnh hưởng đến IOPS

### Kích thước khối
- Các khối nhỏ (4KB) thường cho ra số IOPS cao hơn
- Các khối lớn (64KB+) dẫn đến IOPS thấp hơn nhưng thông lượng cao hơn
- Đặc điểm khối lượng công việc xác định kích thước khối tối ưu
- Khối lượng công việc hỗn hợp yêu cầu cách tiếp cận cân bằng

### Tỷ lệ đọc/ghi
- Thao tác đọc thường nhanh hơn thao tác ghi
- Thao tác ghi có thể yêu cầu xử lý bổ sung (nhật ký, tổng kiểm tra)
- Hiệu quả bộ nhớ cache thay đổi với các mẫu đọc/ghi
- Truy cập ngẫu nhiên so với tuần tự ảnh hưởng đáng kể đến hiệu suất

### Mẫu truy cập
- **Truy cập tuần tự**: Các khối dữ liệu liên tiếp được truy cập theo thứ tự
- **Truy cập ngẫu nhiên**: Các khối dữ liệu được truy cập không theo thứ tự
- Thao tác tuần tự thường đạt thông lượng cao hơn
- Thao tác ngẫu nhiên phản ánh tốt hơn các khối lượng công việc ứng dụng điển hình

### Loại phương tiện lưu trữ
- **HDD**: Ổ đĩa cơ học với các bộ phận chuyển động
- **SSD**: Ổ đĩa thể rắn không có bộ phận chuyển động
- **NVMe**: Lưu trữ flash hiệu suất cao với độ trễ thấp
- **Hybrid**: Sự kết hợp của công nghệ HDD và SSD

## Tính toán IOPS

### IOPS tối đa lý thuyết
Đối với HDD:
```
IOPS = 1 / (Độ trễ trung bình + Thời gian tìm kiếm trung bình)
```

Đối với SSD:
```
IOPS = 1 / Độ trễ trung bình
```

### Tác động RAID
- Cấu hình RAID ảnh hưởng đến IOPS do các phép tính kiểm tra chẵn lẻ
- RAID 0: Không có hình phạt, hiệu suất tối đa
- RAID 1: Hình phạt ghi 2x (gương phải được cập nhật)
- RAID 5: Hình phạt ghi 4x (thao tác đọc-sửa-ghi)
- RAID 6: Hình phạt ghi 6x (tính toán kiểm tra chẵn lẻ kép)

## Các cân nhắc VMware vSphere

### Chính sách lưu trữ
- Xác định yêu cầu IOPS cho các khối lượng công việc khác nhau
- Triển khai kiểm soát I/O lưu trữ để quản lý tài nguyên
- Giám sát và thực thi giới hạn IOPS để ngăn chặn tranh chấp
- Sử dụng Storage DRS để cân bằng IOPS giữa các datastore

### Giám sát hiệu suất
- Theo dõi các chỉ số IOPS bằng esxtop và biểu đồ hiệu suất vCenter
- Giám sát độ trễ cùng với IOPS để có cái nhìn hiệu suất toàn diện
- Xác định các nút thắt cổ chai IOPS ở cấp độ host, lưu trữ và mạng
- Tương quan IOPS với các chỉ số hiệu suất ứng dụng

### Quy hoạch năng lực
- Xác định yêu cầu IOPS hiện tại
- Dự báo nhu cầu IOPS trong tương lai dựa trên xu hướng tăng trưởng
- Tính đến các kịch bản sử dụng cao điểm
- Lên kế hoạch cho khoảng trống hiệu suất và khả năng mở rộng

## Các thực hành tốt nhất

1. **Đặc tả khối lượng công việc**: Hiểu các yêu cầu IOPS cho các ứng dụng khác nhau
2. **Kiểm tra hiệu suất**: Tiến hành kiểm tra hiệu suất thực tế với các khối lượng công việc đại diện
3. **Giám sát**: Triển khai giám sát IOPS liên tục với ngưỡng cảnh báo phù hợp
4. **Quản lý tài nguyên**: Sử dụng kiểm soát I/O lưu trữ để đảm bảo phân bổ tài nguyên công bằng
5. **Thiết kế kiến trúc**: Thiết kế kiến trúc lưu trữ để đáp ứng các yêu cầu IOPS cao điểm

## Các lệnh khắc phục sự cố

```bash
# Giám sát IOPS bằng esxtop (nhấn 'i' để xem chế độ xem bộ điều hợp đĩa)
esxtop

# Xem các chỉ số hiệu suất lưu trữ
esxcli storage core device list

# Kiểm tra cài đặt kiểm soát I/O lưu trữ
esxcli storage vmfs extent list

# Xem thống kê lưu trữ máy ảo
vim-cmd vmsvc/getallvms | while read vmid name; do
  if [[ $vmid =~ ^[0-9]+$ ]]; then
    vim-cmd vmsvc/storage/info $vmid
  fi
done
```

## Các công nghệ liên quan

- [Lưu trữ](/glossary/term/storage)
- [Kiểm soát I/O Lưu trữ](/glossary/term/storage-io-control)
- [Storage DRS](/glossary/term/storage-drs)
- [vSAN](/glossary/term/vsan)
- [VMFS](/glossary/term/vmfs)
- [LUN](/glossary/term/lun)
- [Tối ưu hiệu suất](/knowledge/article/performance-tuning-in-vsphere-8)