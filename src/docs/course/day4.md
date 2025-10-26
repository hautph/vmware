---
title: Network Operations & Security Mindset
day: 4
---

# Day 4: Network Operations

## Overview
Today's session focuses on advanced vSphere networking concepts, including distributed switches, network I/O control, and the vSphere Distributed Services Engine. These technologies are essential for building scalable, high-performance virtualized networks.

## Learning Objectives
By the end of this session, you will be able to:
- Configure and manage vSphere Distributed Switches (VDS)
- Explain how VMware vSphere Network I/O Control enhances performance
- Describe distributed switch features such as port mirroring and NetFlow
- Define vSphere Distributed Services Engine
- Explain the use cases and benefits of vSphere Distributed Services Engine

## Topics Covered

### 1. vSphere Distributed Switches (VDS)

#### Understanding VDS
vSphere Distributed Switches provide centralized management of networking for multiple hosts. Unlike standard switches, VDS offers advanced features and consistent configuration across the entire cluster.

**Key Benefits:**
- Centralized management and configuration
- Advanced networking features (NetFlow, Port Mirroring, LACP)
- Enhanced monitoring and troubleshooting capabilities
- Consistent network policies across hosts

#### Creating and Configuring VDS
**Steps to Create a VDS:**
1. In the vSphere Client, navigate to the datacenter or folder
2. Right-click and select **Distributed Switch** > **New Distributed Switch**
3. Specify the switch name and version compatibility
4. Configure uplink ports and port groups
5. Add hosts to the distributed switch

**Configuration Options:**
- **Uplink Ports**: Define physical uplinks for the switch
- **Port Groups**: Create logical network segments
- **Teaming and Failover**: Configure load balancing and redundancy
- **Security Policies**: Set up promiscuous mode, MAC changes, and forged transmits

#### Managing VDS
**Best Practices:**
- Plan your network topology before deployment
- Use descriptive names for switches and port groups
- Implement consistent naming conventions
- Regularly update VDS versions for new features
- Monitor network performance and adjust configurations as needed

### 2. vSphere Network I/O Control (NIOC)

#### Understanding NIOC
Network I/O Control allows you to prioritize and allocate bandwidth to different types of network traffic, ensuring critical workloads receive the resources they need.

**Traffic Types:**
- Virtual machine traffic
- vSphere vMotion
- iSCSI storage
- NFS storage
- vSphere Fault Tolerance
- vSphere Replication
- Management traffic
- vSphere High Availability
- vSphere Backup Traffic

#### Configuring NIOC
**Steps to Enable NIOC:**
1. Select the distributed switch in the vSphere Client
2. Go to **Configure** > **Settings** > **Resource Allocation**
3. Enable Network I/O Control
4. Set bandwidth limits and reservations for each traffic type

**Configuration Options:**
- **Shares**: Relative priority of traffic types
- **Reservation**: Guaranteed minimum bandwidth
- **Limit**: Maximum bandwidth allocation
- **Quota**: Percentage-based allocation

#### Benefits of NIOC
- Prevents network congestion
- Ensures critical traffic receives priority
- Improves overall network performance
- Enables better resource planning

### 3. Advanced VDS Features

#### Port Mirroring
Port mirroring allows you to monitor network traffic by copying packets from source ports to destination ports for analysis.

**Use Cases:**
- Network troubleshooting
- Security monitoring
- Performance analysis
- Compliance auditing

**Configuration Steps:**
1. In the vSphere Client, navigate to the distributed switch
2. Go to **Configure** > **Settings** > **Port Mirroring**
3. Click **Add** to create a new port mirroring session
4. Specify source and destination ports
5. Configure session settings and enable the session

#### NetFlow
NetFlow provides detailed network traffic statistics for monitoring and analysis.

**Key Features:**
- Traffic flow analysis
- Bandwidth utilization reporting
- Security monitoring
- Network planning and optimization

**Configuration Steps:**
1. Select the distributed switch
2. Go to **Configure** > **Settings** > **NetFlow**
3. Enable NetFlow and configure collector settings
4. Set sampling rate and other parameters
5. Apply settings to port groups as needed

### 4. vSphere Distributed Services Engine (DSE)

#### What is DSE?
vSphere Distributed Services Engine is a framework that enables advanced networking services to run directly on compatible hardware, such as DPUs (Data Processing Units) or SmartNICs.

**Key Components:**
- Hardware-accelerated networking services
- Offloading of network processing from CPU
- Enhanced security and performance
- Support for advanced network functions

#### Benefits of DSE
- **Performance**: Hardware acceleration reduces CPU overhead
- **Security**: Isolated execution environment for network services
- **Scalability**: Ability to handle more network-intensive workloads
- **Efficiency**: Better resource utilization and lower latency

#### Use Cases
- High-performance computing environments
- Network-intensive applications
- Security-sensitive workloads
- Edge computing deployments

## Hands-On Exercises

### Exercise 1: Creating and Configuring a VDS
1. Create a new distributed switch with appropriate uplink configuration
2. Add hosts to the distributed switch
3. Create port groups for different network segments
4. Configure teaming and failover policies

### Exercise 2: Configuring Network I/O Control
1. Enable NIOC on your distributed switch
2. Set bandwidth reservations for critical traffic types
3. Configure shares to prioritize different traffic types
4. Monitor network performance before and after configuration

### Exercise 3: Setting up Port Mirroring
1. Create a port mirroring session
2. Configure source and destination ports
3. Capture and analyze network traffic
4. Document findings and observations

## Key Takeaways
- VDS provides centralized management and advanced features for virtual networking
- NIOC helps prioritize network traffic and prevent congestion
- Advanced features like Port Mirroring and NetFlow enhance monitoring capabilities
- DSE enables hardware-accelerated networking services for improved performance

## Further Reading
- VMware vSphere Networking Documentation
- vSphere Distributed Switch Best Practices Guide
- Network I/O Control Technical Deep Dive
- vSphere Distributed Services Engine Implementation Guide

***

## I. Tư duy Quản trị và Kiến thức Cốt lõi

### 1. Triết lý Bảo mật (Zero-Day & Cải tiến liên tục)
* **Zero-Day (0-Day):** Thuật ngữ chỉ lỗ hổng bảo mật chưa được vá, bị tin tặc khai thác ngay từ "ngày thứ 0" (trước khi nhà sản xuất biết hoặc có bản vá).
* **Nguyên tắc Quản trị:** Không có hệ thống nào là bảo mật nhất tuyệt đối. Hệ thống chỉ **an toàn nhất tại một thời điểm nhất định**.
* **Yêu cầu:** **Cải tiến An toàn Thông tin (ATTT) liên tục** là bắt buộc đối với Quản trị viên để đối phó với các mối đe dọa mới.

### 2. Phân biệt Tài liệu Kỹ thuật và Tiếp thị
* **Best Practices:** Thường do bộ phận Sale/Marketing viết, mang tính chất khuyến nghị chung.
* **Tài liệu Chuyên sâu:** Quản trị viên cần tìm các tài liệu chuyên sâu hơn như:
    * **Architecture:** Cấu trúc, thiết kế.
    * **Mastering/Guru:** Hướng dẫn chuyên gia, chi tiết.
    * **Performance Tuning:** Tối ưu hóa hiệu suất.
    * **Cookbook/Fine-Tuning:** Hướng dẫn thực hành chi tiết theo bước.
* **GA (General Availability):** Tài liệu gốc, chính thức từ nhà sản xuất.

### 3. Công cụ và Tài liệu Tham khảo
* **Quản lý Thư viện:** Sử dụng phần mềm **Calibre** (kovidgoyal/calibre) để quản lý kho sách/tư liệu cá nhân.
* **VDI Sizing Tool:** Sử dụng file Excel `vdi-host-caculator-v1.4.xlsx` để tính toán tài nguyên **VDI (Virtual Desktop Infrastructure)**.
    * **KPI Hiệu suất:** Độ trễ (**Latency**) dưới **10ms** là mức chấp nhận được.
    * **vRAM:** Cần được **LOCKED AND RESERVED** để đảm bảo hiệu suất.

***

## II. Bài tập 5: Công cụ Tính toán TCO cho VMware vSAN 8.0 (Sizer Calculator)

Bài tập này yêu cầu phát triển một công cụ tính toán toàn diện, chi tiết hóa chi phí và hiệu suất cho triển khai vSAN 8.0 trở lên, kết hợp CapEx, OpEx, và TCO.

### Phân tích Yêu cầu và Công thức Cốt lõi

| Hạng mục | Công thức Tính toán Cốt lõi | Chi tiết Đầu vào (Input) |
| :--- | :--- | :--- |
| **I. CapEx (Chi phí Vốn)** | $CapEx = C_{Phần cứng} + C_{License Ban đầu} + C_{Triển khai/Tích hợp}$ | Số Host ESXi, Loại Máy chủ (CPU, RAM, HDD/SSD), License vSAN (Loại & Số lượng), Chi phí triển khai dịch vụ. |
| **II. OpEx (Chi phí Vận hành)** | $OpEx = C_{Bảo trì hàng năm} + C_{Năng lượng} + C_{Làm mát} + C_{License Renewal}$ | Phí bảo trì phần cứng/phần mềm (%), Công suất Máy chủ (W), Công suất Thiết bị Mạng (W), Chi phí điện (đồng/kWh), Tỷ lệ làm mát (Cost Ratio). |
| **III. TCO (Tổng Chi phí Sở hữu)** | $TCO_{Năm N} = CapEx + \sum_{i=1}^{N} OpEx_i$ | Dự toán TCO cho 3 năm và 5 năm. |
| **IV. Sizing Lưu trữ** | $Dung lượng Raw = Dung lượng Yêu cầu \times FTT Factor$ | FTT (Failure To Tolerate) Factor: RAID-1 (2x), RAID-5/6 (1.33x - 2x). |
| **V. Sizing Hiệu suất** | $IOPS_{Cần} = IOPS_{Đọc} + IOPS_{Ghi} \times RAID Penalty$ | IOPS yêu cầu, Tỷ lệ Đọc/Ghi, Cache Read/Write (%). |

### Cấu trúc File Excel `vSAN-PD.xlsx` (Conceptual Structure)

| Tên Sheet | Nội dung chính | Công thức/Tính toán chính |
| :--- | :--- | :--- |
| **1. Thông Tin Đầu Vào** | Thu thập tất cả **Input Parameters** (ESXi, Mạng, IOPS, FTT, License, Công suất...). | Các ô nhập liệu dạng Text, Dropdown List. |
| **2. Dữ Liệu Tham Chiếu** | Bảng giá tham khảo (CPU, RAM, SSD/NVMe, License Price). | Tra cứu giá License theo loại (Standard, Advanced, Enterprise...). |
| **3. Tính Toán Sizing** | Tính toán phần cứng cần thiết để đáp ứng yêu cầu. | $Dung lượng Cache = Dung lượng Raw \times 10\% - 25\%$ (Ví dụ), Tính toán $IOPS_{Dự kiến}$ (dựa trên thông số Disk). |
| **4. Tổng Kết Chi Phí** | Tính CapEx, OpEx hàng năm, và TCO theo năm. | Áp dụng các công thức TCO ở trên. Tính chi phí điện năng: $P_{Total} \times 24h \times 365 ngày \times C_{điện} \times C_{làm mát}$. |
| **5. Dashboard** | Biểu đồ trực quan hóa kết quả. | Biểu đồ **TCO (3Y/5Y)**, Biểu đồ **Phân bổ CapEx/OpEx**, Biểu đồ **IOPS Yêu cầu vs Dự kiến**. |

**Lưu ý:** Công cụ tính toán vSAN chính thức là **vSAN Sizer** của Broadcom/VMware, nhưng việc xây dựng một Calculator nội bộ giúp Quản trị viên hiểu rõ các biến số ảnh hưởng đến chi phí và hiệu suất.

***

## III. Yêu cầu Phát triển Công cụ Web-based Calculator (Fullstack)

Yêu cầu này vượt ra ngoài phạm vi Quản trị hệ thống thuần túy, yêu cầu kỹ năng **Phát triển Fullstack** (Front-end, Back-end, Database) và là một bài tập rất tham vọng.

| Yêu cầu Kỹ thuật | Phân tích Ngắn gọn |
| :--- | :--- |
| **Phân tích CapEx/OpEx** | Cần một Backend (ví dụ: Python/Django hoặc Node.js/Express) để xử lý các công thức tính TCO phức tạp. |
| **Dashboard Trực quan** | Sử dụng thư viện Front-end (ví dụ: React/Vue/Angular) và thư viện biểu đồ (ví dụ: Chart.js, D3.js) để tạo Dashboard, Heatmap. |
| **Technical Documentation** | Cần xuất các công thức toán học (có thể dùng **LaTeX** để đảm bảo độ chính xác). |
| **Technical Requirements** | Yêu cầu Database (ví dụ: PostgreSQL, MongoDB) để lưu trữ các kịch bản tính toán (Sample Scenarios). |

Đây là một dự án **POC (Proof of Concept)** rất giá trị, biến kiến thức lý thuyết về TCO và Sizing thành một công cụ thực tế hỗ trợ quyết định đầu tư.