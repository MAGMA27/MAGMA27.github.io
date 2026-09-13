---
locale: en
translationKey: 20260520-windows-lerobot
title: How to Reproduce LeRobot on Windows
date: 2026-05-20T13:16:19.097Z
tags: [embodied AI, LeRobot]
comments: false
draft: false
summary: How to reproduce LeRobot on Windows
category: Embodied AI
---

> Translated by GPT-5.6 Luna.

# Overall approach

You can reproduce LeRobot either on native Windows or in WSL.
The advantage of reproducing it natively is that the hardware does not need a passthrough connection, making it more stable and responsive. The difficulty is that the official LeRobot installation instructions are designed for Unix-like systems (Linux or macOS), so setting up the environment on Windows may lead to errors.
With WSL, you can use a Linux system, which makes environment setup very convenient. The difficulty is that hardware passthrough must be configured, and in my testing, cameras could not be used correctly in WSL.

# Reproduction in WSL

## Installing CUDA in WSL2

Please search for a WSL2 installation tutorial yourself; this guide starts directly with the CUDA installation step.
Newer Windows NVIDIA drivers already include the driver for WSL2, so there is no need to install the driver again. You only need to install CUDA. Note that you must choose the WSL version when installing CUDA; otherwise, the installer may install a driver automatically and overwrite the driver that is already installed.
For the installation process, see the [Microsoft tutorial](https://learn.microsoft.com/zh-cn/windows/ai/directml/gpu-cuda-in-wsl) and the [NVIDIA tutorial](https://docs.nvidia.com/cuda/wsl-user-guide/index.html).
After installing the driver and WSL2, enter the Ubuntu system.

```shell
wsl -l -v # List the installed WSL distributions
wsl # Enter the default distribution
wsl --distribution <Distribution Name> --user <User Name> # Enter a specified distribution as a specified user
```

First remove the old GPG key in the system:

```shell
sudo apt-key del 7fa2af80
```

Open the [WSL CUDA download page](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_local). Make sure to select the WSL version, then follow the commands shown on the page to install it.

## Installing LeRobot

Follow the [official Hugging Face installation guide](https://huggingface.co/docs/lerobot/v0.5.1/en/installation).

## Hardware passthrough

### Installing the drivers

#### Step 1: Install the server on Windows

1. **Download and install**:  
   You can use the Windows Package Manager (recommended) or download and install it manually.
   - **Command-line installation** (run in an administrator PowerShell):
     ```powershell
     winget install --interactive --exact dorssel.usbipd-win
     ```
   - Alternatively, download the `.msi` installer from the GitHub project page and run it.
2. **Restart**: After installation, it is recommended that you restart the computer to make sure the driver takes effect.

#### Step 2: Install the client in WSL 2

Enter your WSL 2 system (for example, Ubuntu) and install the USB/IP client tools.

```bash
sudo apt update
sudo apt install linux-tools-generic hwdata -y
# Create a symbolic link so the usbip command can be called directly
sudo update-alternatives --install /usr/local/bin/usbip usbip /usr/lib/linux-tools/*/usbip 20
```

#### Step 3: Attach the device

Suppose you want to connect a USB-to-serial device such as a CH340:

1. **List the devices**:  
   In **Windows PowerShell (Administrator)**, run:

   ```powershell
   usbipd list
   ```

   You will see a list similar to the following. Find your device and note its **BUSID** (for example, `1-1`).

   ```text
   Connected:
   BUSID  VID:PID    DEVICE                STATE
   1-1    1a86:7523  USB-SERIAL CH340      Not shared
   ```

2. **Bind the device**:  
   Tell Windows to allow this device to be shared:

   ```powershell
   usbipd bind --busid 1-1
   ```

3. **Attach it to WSL**:  
   "Plug" the device into WSL:

   ```powershell
   usbipd attach --wsl --busid 1-1
   ```

#### Step 4: Verify

Back in your **WSL terminal**, run:

```bash
lsusb
```

You should see the device in the list. If it is a serial device, it will usually appear as `/dev/ttyUSB0` or `/dev/ttyACM0`.

---

### Notes

1. **Exclusive access**:  
   Once a device is connected to WSL 2, **Windows can no longer use it**. For example, if you pass a USB camera through to WSL, the Windows Camera app will report that it cannot find a camera.
2. **Disconnecting**:  
   When you are finished, it is recommended that you disconnect the device in PowerShell so it can return to Windows:

   ```powershell
   usbipd detach --busid 1-1
   ```

   Alternatively, unplug the USB device and plug it back in; it will automatically return to Windows.

### Connecting the SO-100

After connecting and passing through the device as described above, run `lsusb` in WSL. You should see something like this:

```text
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 001 Device 003: ID 1a86:55d3 QinHeng Electronics USB Single Serial
Bus 001 Device 004: ID 1a86:55d3 QinHeng Electronics USB Single Serial
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

This indicates that passthrough succeeded and the serial devices are visible in WSL.

#### Changing permissions

If you run the serial tool directly, you may see a `Permission denied` error. This is because a regular user does not have permission to read from or write to serial devices by default.
Add your current user to the `dialout` group:

```bash
sudo usermod -aG dialout $USER
```

#### Troubleshooting

Run the following command in the WSL terminal:

```bash
ls -l /dev/ttyACM*
```

If the device still cannot be found, the driver may not be installed:

```bash
# 1. Load generic USB serial support first
sudo modprobe usbserial

# 2. Try the QinHeng (CH34x) dedicated driver
sudo modprobe ch341

# 3. If that does not work, try the Silicon Labs (CP210x) driver
#    (many domestic chips are compatible with this one)
sudo modprobe cp210x

# 4. Another possibility is an FTDI chip
#    (although your ID does not look like one, keep this as a fallback)
sudo modprobe ftdi_sio
```

Check again:

```bash
ls -l /dev/ttyACM*
```

If it is still not found, unplug and reconnect the mapped USB device after the installation is complete.

1. **Confirm that the driver loaded successfully**:  
   Run `lsmod | grep usbserial`. If there is output, the driver module is ready.
2. **Force-bind the ID (using ch341 as an example)**:  
   We need to add the `1a86:55d3` ID to the driver configuration.

   First, locate the driver file (usually under `/sys/bus/usb-serial/drivers/`):

   ```bash
   # View the new ID interface for the ch341 driver
   sudo sh -c 'echo "1a86 55d3" > /sys/bus/usb-serial/drivers/ch341-uart/new_id'
   ```

# Reproduction on Windows

## Configuring the environment

Follow the [official Hugging Face installation guide](https://huggingface.co/docs/lerobot/v0.5.1/en/installation) to install Conda and create a virtual environment.
When running `conda install ffmpeg -c conda-forge`, I encountered an error caused by a GBK/UTF-8 encoding conflict:

```text
librsvg: The post-link script did not complete.
To take advantage of gdk-pixbuf's support for librsvg, please run:
D:\anaconda3\envs\lerobot\Scripts\.gdk-pixbuf-post-link.bat
done

ERROR conda.core.link:_execute(1031): An error occurred while installing package 'conda-forge::gdk-pixbuf-2.44.5-h1f5b9.
Rolling back transaction: done
UnicodeDecodeError('gbk', b"g_module_open() failed for D:\\anaconda3\\envs\\lerobot\\Library\\lib\\gdk-pixbuf-2.0\\2.10) ()
```

I tried configuring Conda, but the problem was not resolved. I ultimately chose to install a system-level version of FFmpeg. **The system-level FFmpeg solution only applies to PyTorch >= 2.10.**
Download `ffmpeg-git-full.7z` from the [FFmpeg builds page](https://www.gyan.dev/ffmpeg/builds/?spm=5176.28103460.0.0.5c092988OHh7JG). Extract it locally (for example, to the path `D:\ffmpeg`, which contains no non-English characters), add the `bin` directory (`D:\ffmpeg\bin`) to the system `PATH` environment variable, and then continue with the official setup instructions.
