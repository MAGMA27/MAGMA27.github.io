---
title: 如何在windows复现lerobot
date: 2026-05-20T13:16:19.097Z
tags: [embody, lerobot]
comments: false
draft: false
summary: 如何在windows复现lerobot
category: 具身智能
---

# 整体路线

可以选在在windows本机复现，也可以在wsl复现。
本机复现的好处是硬件无需透传连接，更加稳定迅速，但难点是lerobot官方提供的安装方式都是适用于类unix系统（linux或macOS），在windows上部署环境可能遇到报错。
WSL复现的话，则可以使用linux系统，配置环境非常方便，但难点是需要配置硬件的透传，而且在实测中，相机无法在wsl中被正确的使用。

# WSL复现

## 在wsl2中安装cuda

安装wsl2的过程请自行搜索教程，这里直接到安装cuda这一步。
在新版的windows nvidia 驱动中，已经包含了wsl2中的驱动，因此无需重复安装驱动，只需要安装cuda即可，需要注意的是，安装cuda需要选择wsl版本的，不然可能会自动安装驱动，覆盖掉已经安装的驱动。
安装流程可以参考[mircrosoft 教程](https://learn.microsoft.com/zh-cn/windows/ai/directml/gpu-cuda-in-wsl)和[nvidia 教程](https://docs.nvidia.com/cuda/wsl-user-guide/index.html)。
在安装好驱动和wsl2后，进入ubuntu系统

```shell
wsl -l -v # 查看已安装的wsl子系统
wsl # 进入默认系统
wsl --distribution <Distribution Name> --user <User Name> # 指定系统指定用户进入
```

在系统中先删除旧的GPG key

```shell
sudo apt-key del 7fa2af80
```

进入[wsl的cuda下载界面](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_local)，注意要选择wsl的版本，而后参照见面中的命令安装即可

## 安装lerobot

按照[hugging face官方配置教程](https://huggingface.co/docs/lerobot/v0.5.1/en/installation)配置即可。

## 硬件映射

### 安装驱动

#### 第一步：在 Windows 上安装服务端

1. **下载安装**：  
   你可以通过 Windows 包管理器（推荐）或手动下载安装。
   - **命令行安装**（在管理员权限的 PowerShell 中运行）：
     ```powershell
     1winget install --interactive --exact dorssel.usbipd-win
     ```
   - 或者去 GitHub 项目页面下载 `.msi` 安装包并运行。
2. **重启**：安装完成后，建议重启一下电脑以确保驱动生效。

#### 第二步：在 WSL 2 中安装客户端

你需要进入你的 WSL 2 系统（例如 Ubuntu），安装 USB/IP 的客户端工具。

```bash
sudo apt update
sudo apt install linux-tools-generic hwdata -y
# 创建一个软链接，方便直接调用 usbip 命令
sudo update-alternatives --install /usr/local/bin/usbip usbip /usr/lib/linux-tools/*/usbip 20
```

#### 第三步：连接设备

假设你要连接一个 USB 转串口设备（如 CH340）：

1. **查看设备列表**：  
   在 **Windows PowerShell（管理员）** 中输入：

   ```powershell
   usbipd list
   ```

   你会看到类似这样的列表，找到你的设备，记下它的 **BUSID**（例如 `1-1`）。

   ```text
   Connected:
   BUSID  VID:PID    DEVICE                STATE
   1-1    1a86:7523  USB-SERIAL CH340      Not shared
   ```

2. **绑定设备**：  
   告诉 Windows 允许共享这个设备：

   ```powershell
   usbipd bind --busid 1-1
   ```

3. **附加到 WSL**：  
   将设备“插”到 WSL 里：

   ```powershell
   usbipd attach --wsl --busid 1-1
   ```

#### 第四步：验证

回到你的 **WSL 终端**，输入：

```bash
1lsusb
```

你应该能看到该设备已经出现在列表中。如果是串口设备，通常会在 `/dev/ttyUSB0` 或 `/dev/ttyACM0` 出现。

---

### 注意事项

1. **独占性**：  
   一旦设备连接到了 WSL 2，**Windows 就无法使用该设备了**。例如，如果你把 USB 摄像头连给了 WSL，Windows 的相机应用就会显示找不到摄像头。
2. **断开连接**：  
   用完后，建议在 PowerShell 中断开连接，让设备回归 Windows：

   ```powershell
   usbipd detach --busid 1-1
   ```

   或者直接拔掉 USB 设备再插上，它会自动回到 Windows。

### SO-100连接

按照上述方式连接设备并透传设备后，在wsl中输入 `lsusb`，看到如下内容

```text
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 003: ID 1a86:55d3 QinHeng Electronics USB Single Serial
Bus 001 Device 004: ID 1a86:55d3 QinHeng Electronics USB Single Serial
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

表明已经透传成功，在wsl中已经可以看到串口设备

#### 权限修改

如果你直接运行串口工具，可能会报错 `Permission denied`。这是因为普通用户默认没有权限读写串口设备。
将你的当前用户加入到 `dialout` 用户组

```bash
sudo usermod -aG dialout $USER
```

#### trouble shooting

在 WSL 终端输入以下命令：

```bash
ls -l /dev/ttyACM*
```

如果还是无法找到设备，可能是驱动未安装

```bash
# 1. 先加载通用的 USB 串口支持
sudo modprobe usbserial

# 2. 尝试加载沁恒 (CH34x) 专用驱动
sudo modprobe ch341

# 3. 如果上面不行，尝试加载 Silicon Labs (CP210x) 驱动（很多国产芯片兼容这个）
sudo modprobe cp210x

# 4. 还有一种可能是 FTDI 芯片（虽然你的 ID 不像，但也备着）
sudo modprobe ftdi_sio
```

再次查看

```bash
ls -l /dev/ttyACM*
```

如果还未找到，并在安装完成后重新插拔映射usb

1. **确认驱动是否加载成功**：  
   输入 `lsmod | grep usbserial`，如果有输出，说明驱动模块已经准备好了。
2. **强制绑定 ID（以 ch341 为例）**：  
   我们需要把 `1a86:55d3` 这个 ID 写入驱动配置。

   首先，找到驱动文件的位置（通常在 `/sys/bus/usb-serial/drivers/` 下）：

   ```bash
   # 查看 ch341 驱动的新 ID 接口
   sudo sh -c 'echo "1a86 55d3" > /sys/bus/usb-serial/drivers/ch341-uart/new_id'
   ```

# windows复现

## 配置环境

按照[hugging face官方配置教程](https://huggingface.co/docs/lerobot/v0.5.1/en/installation)安装conda，创建虚拟环境。
在安装conda install ffmpeg -c conda-forge时遇到报错，报gbk与utf-8编码冲突

```text
librsvg: The post-link script did not complete.
To take advantage of gdk-pixbuf's support for librsvg, please run:     
D:\anaconda3\envs\lerobot\Scripts\.gdk-pixbuf-post-link.bat
done

ERROR conda.core.link:_execute(1031): An error occurred while installing package 'conda-forge::gdk-pixbuf-2.44.5-h1f5b9.
Rolling back transaction: done
UnicodeDecodeError('gbk', b"g_module_open() failed for D:\\anaconda3\\envs\\lerobot\\Library\\lib\\gdk-pixbuf-2.0\\2.10) ()
```

尝试在conda中进行配置，未解决问题，最终选择安装系统级ffmpeg，**系统级ffmpeg只适用于 PyTorch >= 2.10**
在[ffmpeg编译版下载页面](https://www.gyan.dev/ffmpeg/builds/?spm=5176.28103460.0.0.5c092988OHh7JG)下载ffmpeg-git-full.7z，在本地解压后（D:\ffmpeg纯英文路径），将bin目录（D:\ffmpeg\bin）添加到系统 `PATH` 环境变量，而后安装官方教程配置。
