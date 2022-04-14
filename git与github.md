# git与github

## 1.介绍

### 1.1.git的介绍

git是一个分布式的版本控制系统，用来帮助我们进行项目的版本管理。

#### 1.1.1.为什么要进行版本管理

试想几个场景：项目发布了一个新功能，后来发现有bug需要回退到上一个版本；突然想到一个新点子，写着写着发现行不通，需要回退到初始状态但是改了很多地方的代码；同事协作开发你和他分别开发不同模块最后代码需要合并在一起；你电脑突然炸了…

开发中这些情况都是很常见的，不可能每次都把项目整个打包备份一遍，既不方便也容易忘记备份。这时你就需要一款版本管理工具。（PS：版本管理工具并不是将你的代码无脑的copy保存一份，而是记录你每次的修改，以便于日后的回退合并等。）

#### 1.1.2.为什么要用git进行版本管理

git是*分布式*的版本控制工具，而对应的有*集中式*的版本控制工具（比如svn）。

集中式的工具把项目存放在中央服务器中，这样的形式弊端有很多，比如每次都要从中央服务器拉取与提交代码，不联网没法工作，且耗费时间；万一中央服务器炸了…那就完蛋了。

而分布式的版本控制工具不存在中央服务器的概念，团队中参与开发的每位成员的电脑都是一个服务器，都有着项目的完整版本库，这样即使你没有联网，也可以先在本地进行开发。并且即使你电脑炸了，你同事电脑上还保存着完整的版本库。虽然没有”中央服务器“，但是实际开发中会有一个服务器充当“中央服务器”的角色（比如github），便于团队成员提交与交换代码。

#### 1.1.3.git的历史

git是由linux之父（Linus Torvalds 林纳斯·托瓦兹）用了两周开发的。当时开发与维护Linux系统时，他们团队使用的是另外一款版本控制软件，但是期间和该软件开发商闹了点不愉快，所以Linus 自己写了一个git……发展到现在，git已经是全世界范围类最好用的版本控制工具了！

#### 1.1.4.安装git

[git官网](https://git-scm.com/)下载安装。

### 1.2.github的介绍

[github](https://github.com/)是一个网站，准确的说是一个用户托管项目的平台，也就是上述所说的充当“中央服务器”的平台。这个网站是面向全世界的，所以你能在这里看到全世界著名的程序员和他们著名的项目。

代码托管平台不只github一个，比如国内有名的[码云gitee](https://gitee.com/)也是其中之一。当然，从热度上来讲，没有哪个平台能超过github。

使用github做项目托管之前，你需要在[github官网](https://github.com/)注册账号。我们要求每一位学员必须有自己的github账号。

简单地说，**git是一个软件，我们安装之后可以在本地直接使用。而github是一个远程仓库，我们注册之后就可以结合git进行项目的托管。**需要我们学习的github使用并不多，所以接下来的学习重点主要是在git的使用上。

另外，git免费，github托管也免费（托管私有项目要收费）。

## 2.使用git

git安装之后，会在右键菜单中新增两个选项`Git Bash here`（命令行方式）和`Git GUI here`（图形界面方式）。为了适应在不同系统环境下的开发，通常我们都会使用命令行方式进行git管理。下面我们将学习如何使用命令行的方式进行版本管理。

### 2.1.init创建本地仓库

在项目目录下右键，选择`Git Bash here`（直接用cmd进入项目目录也可以）。运行命令：

```
git init
```

命令框中自动出现一段话`Reinitialized existing Git repository in 项目路径/.git/`，同时项目目录中新增一个默认隐藏的文件夹`.git`（window系统默认不显示隐藏文件夹，需要打开 *隐藏的项目* 选项，不会的可自行百度，当然不打开也没有关系，不影响后面的操作）。

![](https://afeifeifei.github.io/class-demo/git/git init.png)

当然，不是一定要空目录才能`git init`，你可以在已有项目文件的目录中执行命令。

### 2.2.config配置个人信息

毕竟你会和你同事一起开发项目，所以使用git之前必须先告诉git你是谁（不然到时候上线了功能有BUG的话没法找到背锅侠…）。

输入 *git config* 命令添加你的个人信息：

```
git config --global user.name "afeifei"
```

```
git config --global user.email "53498870@qq.com"
```

### 2.3.添加与提交

首先我们模拟编写一个项目文件`readme.html`，并写点内容：

![https://afeifeifei.github.io/class-demo/git/add%20commit.png](https://afeifeifei.github.io/class-demo/git/add commit.png)

#### 2.3.1.add添加到暂存区

运行命令 *git add 文件名*，将文件添加到暂存区：

```
git add readme.html
```

![1](https://afeifeifei.github.io/class-demo/git/add.png)

（PS：如果一次需要添加多个文件，文件名之间用空格隔开。如果一次添加所有文件，可以用 . 代替文件名。）

#### 2.3.2.commit提交到仓库

运行命令 *git commit -m "这里写与提交文件相关的信息"*，将文件提交到本地仓库：

```
git commit -m "created a readme.html file"
```

![](https://afeifeifei.github.io/class-demo/git/commit.png)

运行之后，会有几行文字告诉你这次提交相关的信息。比如我们这次的提示是：1个文件发生改变，9行内容被插入。

提交信息理论上使用任意语言任意字符都可以，但是实际上，一般大公司会要求国际化使用英文。

### 2.4.历史版本

#### 2.4.1.再提交几次

1. 随着项目进行，我们对 `readme.html` 文件进行修改，并添加与提交：

![](https://afeifeifei.github.io/class-demo/git/change1.png)

```
git add readme.html
```

```
git commit -m "add a tag<h2>"
```

![](https://afeifeifei.github.io/class-demo/git/change2.png)

2. 以便后续操作，我们再修改提交一次：

![](https://afeifeifei.github.io/class-demo/git/change3.png)
```
git add readme.html
```

```
git commit -m "set style"
```

![](https://afeifeifei.github.io/class-demo/git/gitchange3.png)

#### 2.4.2.log查看版本信息

目前，我们已经进行了两次commit了，如何查看所有的提交记录呢？使用 *git log* 命令：

```
git log
```

![](https://afeifeifei.github.io/class-demo/git/gitlog.png)

上图反馈的信息中 commit 后面的一大串黄色16进制数字，就是版本号（每个人的、每次的 版本号是不一样的）。我们还可以使用 *git log --pretty=oneline* 命令显示更简洁的版本信息：

```
git log --pretty=oneline
```

![](https://afeifeifei.github.io/class-demo/git/logoneline.png)

#### 2.4.3.reset版本回退

使用 *git reset --hard* 命令可以实现版本回退。

1. git reset --hard HEAD

   HEAD可以理解为当前版本的一个指针，我们可以使用这些命令来指定恢复到哪个版本：

   - `HEAD`    表示当前最新版本
   - `HEAD^`  表示当前最新版本的前 1 个版本
   - `HEAD^^`表示当前最新版本的前 2 个版本，以此类推

   要是想回退到很早之前的版本，不可能一直写 ^ ，所以还可以使用数字来表示目标版本：

   - `HEAD~1` 表示当前最新版本的前 1 个版本
   - `HEAD~2` 表示当前最新版本的前 2 个版本，以此类推

2. git reset --hard 版本号

   版本号就是上述的那串黄色的16进制数字，回退时我们不必写上完整的版本号，只需要写前几位就可以了。（如果前几位遇到了重复，git会提示你）



**测试一下**

首先先看一下我们现在的文件内容：

![](https://afeifeifei.github.io/class-demo/git/beforereset.png)

然后执行命令：

```
git reset --hard HEAD^
```

我们会发现，文件内容自动变成：

![](https://afeifeifei.github.io/class-demo/git/afterreset.png)

版本回退到了上一个版本，也就是加style之前的版本。

继续回退试试，执行命令：

```
git reset --hard b31c
```

**（注意：这里的 b31c 是我第一次commit的版本号前四位，大家在做测试的时候，版本号肯定不是这个！！！别照抄！别照抄！！别照抄！！！）**

文件内容自动变成：

![](https://afeifeifei.github.io/class-demo/git/reset2.png)

版本回退到了第一次commit。

执行 *git log* 看看：

```
git log
```

![](https://afeifeifei.github.io/class-demo/git/reset-log.png)

回到过去之后，log打印的信息就只有当前版本及之前的内容了。

#### 2.4.4.reflog查看历史版本操作

刚刚我们实现了回到过去，但是如果你回到过去之后又想穿梭到未来呢？以上述例子来看，要是我现在又想回到添加了h2标签和style的时候，该怎么做呢？ *git log* 只能打印出一个版本信息了，而这时候，如果我们使用 *git reflog* 命令来打印历史信息，就可以看到所有的操作内容了：

```
git reflog
```

![](https://afeifeifei.github.io/class-demo/git/reflog.png)

打印的信息如上图，我们可以看到刚刚进行的两次reset操作以及之前的版本信息。

如果我们想回到 **set style** 这一次的commit版本，只需要执行：

```
git reset --hard 80744f4
```

再查看文件，发现已经自动变成了 **set style** 的版本：

![](https://afeifeifei.github.io/class-demo/git/beforereset.png)

（大家可以继续使用 *git log* 查看一下版本，之后如果在使用 HEAD 的方式 reset 的话，还是以 *git log* 打印的版本顺序为基础的。）

#### 2.4.5.revert撤销版本

刚刚我们学习过的 reset 操作，可以将代码版本回退到历史的某个版本。而如果我们只想撤销其中某一次提交的代码内容，不影响之前的也不影响之后，reset是做不到的。

比如说，我们只想保留 第1次 提交 **created a readme.html file** 与 第3次提交 **set style** ，而不要 第2次 提交的 **add a tag\<h2\>**，这时候就需要使用 *git revert 版本号/HEAD* 命令来实现了。

- **当前文件内容：**

  ![](https://afeifeifei.github.io/class-demo/git/beforereset.png)

- **运行命令：**

  ```
  git revert c062
  ```

  （ c062 是第2次提交的版本号）

  这时候会出现一个界面，revert会产生一次新的commit，所以这个界面的意思就是让你写上这一次commit的信息：

  ![](https://afeifeifei.github.io/class-demo/git/revert.png)

  按 i 进入编辑模式，键入该次commit的内容，然后依次按*ESC*，*：*，*w*，*q*，*回车*，完成revert。

- **文件变化：**

  ![](https://afeifeifei.github.io/class-demo/git/revert2.png)

  第2次提交的内容已经自动消失，但是第1次和第3次的内容还保留着。

- **版本信息：**

  使用 *git log --pretty=oneline* 命令来查看现在的版本号：

  ```
  git log --pretty=oneline
  ```

  ![](https://afeifeifei.github.io/class-demo/git/revert3.png)

  我们可以看到多出了一次版本信息。

### 2.5.工作区、暂存区与仓库

#### 2.5.1.概念

**工作区：**就是你的项目文件夹。你开发过程中创建了很多文件，写了很多代码，这些都是对工作区的修改。

**暂存区：**执行 *git add* 命令后，文件就会被存到暂存区。

**仓库：**执行 *git commit* 命令后，暂存区的文件就会被添加到仓库，而暂存区此时也会清空。

（PS：前文提到过，add或commit都不是直接拷贝保存文件，而是保存着各文件的各种改动信息。 上述概念描述是为了让大家更好理解一些，不要误解了。）

可以多次 `git add` 到暂存区，然后统一 `git commit` 到仓库。

#### 2.5.2.status查看状态

使用 *git status* 命令可以查看当前 工作区、暂存区和仓库 的状态。

我们可以通过该命令来查看当前各种情况，以提示自己下一步应该做什么

```
git status
```

不同情况该命令显示的内容是不一样的：

- 当工作区代码都已经被提交到仓库（暂存区无内容），工作区内容与仓库内容完全一致时：

  ![](https://afeifeifei.github.io/class-demo/git/status1.png)

- 当工作区代码已修改，但是还没有add到暂存区时：

  ![](https://afeifeifei.github.io/class-demo/git/status2.png)

- 当工作区新增了文件，但是还没有add到暂存区时：

  ![](https://afeifeifei.github.io/class-demo/git/status4.png)

- 当工作区代码已 add 到暂存区，还没有 commit 到仓库时：

  ![](https://afeifeifei.github.io/class-demo/git/status3.png)

#### 2.5.3.diff查看文件改动

- 工作区改动，还没add，使用 `git diff 文件名` 。
- 已add，还没commit，使用 `git diff HEAD 文件名`。 

#### 2.5.4.checkout未提交到仓库的回退

前一个章节我学习了 *reset* 与 *revert* 来对已经commit到仓库的版本进行各种回退操作。

而对于还没有提交到仓库的代码，我们也可以使用其他命令来实现回退。

*（这几部分操作比较简单，但是需要的截图实在太多了…所以课件上我先不截图了，我们在上课的时候一 一演示。）*

- 工作区代码有变化，但是还没add

  此时如果你发现这个改动不合适，可以使用 `git checkout -- 文件名` 命令，让工作区文件回到最近的一次 **git add** 或 **git commit** 状态。

- 工作区的改动已add，但是还没commit

  1. 首先使用 `git reset HEAD 文件名` 撤销掉当前暂存区（**git add**）里面的内容；

  2. 其次再利用上面的 `git checkout -- 文件名` 让文件回到之前状态。

### 2.6.rm删除文件

为了演示，我们先创建一个新文件，并提交：

![](https://afeifeifei.github.io/class-demo/git/2.5add3.png)

![](https://afeifeifei.github.io/class-demo/git/rm.png)

然后我们在工作区手动删掉 `index.html` 文件，再查看状态：

![](https://afeifeifei.github.io/class-demo/git/rm2.png)

此时如果我们希望将仓库里面的 `index.html` 文件删掉，需要执行rm命令，然后再提交一次 ：

```
git rm index.html
```

```
git commit -m "remove index.html"
```

![](https://afeifeifei.github.io/class-demo/git/rm3.png)



**当然，不排除你删完发现删错了又想找回来的情况，这时和前面提到的历史版本回退方式一样，使用 `git reset --hard 版本号` 的方式，回退到创建index.html文件的那个版本。**

## 3.远程仓库

远程仓库既可以作为代码备份，又可以实现多人协作开发。目前我们常选用的远程仓库有 [github](https://github.com/) 和 [码云gitee](https://gitee.com/)，如何选择看团队要求。接下来的课程我们以 github 为例。

### 3.1.创建密钥

1. 创建SSH Key

   在 **git bash命令框** 中运行 `ssh-keygen -t rsa -C "你的邮箱"`，一路回车到完成：

   ![](https://afeifeifei.github.io/class-demo/git/ssh.png)

   这时，你电脑的用户主目录（如图，我的用户主目录路径是 c:/Users/Administrator，大家因为用户名设置不一样，路径是不一样的，自行查看路径），会多出一个.ssh文件夹，里面有 *id_rsa* 和 *id_rsa.pub* 两个文件。

2. github 添加 SSH Key

   登录github，依次点击 `setting` -> `SSH and GPG keys` -> `New SSH Key`。

   ![](https://afeifeifei.github.io/class-demo/git/ssh2.png)

   *Title*栏随便填，*Key*栏填写刚刚创建的 *id_rsa.pub* 文件的内容，最后点击 `Add SSH Key`。

### 3.2.创建远程仓库项目

![](https://afeifeifei.github.io/class-demo/git/ssh3.png)

![](https://afeifeifei.github.io/class-demo/git/ssh4.png)

### 3.3.推送到远程仓库

现在你本地已有一个项目仓库，远程也有了一个项目仓库，接下来进行同步：

#### 3.3.1.remote连接到远程仓库

1. 复制远程仓库的ssh：

   ![](https://afeifeifei.github.io/class-demo/git/ssh5.png)

2. 回到本地仓库运行命令：

   ```
   git remote add origin git@github.com:afeifeifei/myProject.git
   ```

   注意origin后面的是我的远程仓库地址，大家在做练习时别照抄，替换成刚刚复制的。

#### 3.3.2.push推送文件到远程

1. 推送本地库文件：

   ```
   git push -u origin master
   ```

   ![](https://afeifeifei.github.io/class-demo/git/push.png)

2. 刷新远程仓库：

   可以看到远程仓库内容和本地仓库内容一模一样

   ![](https://afeifeifei.github.io/class-demo/git/push2.png)

   之后本地做了修改想推送到远程时，使用`git push origin master` 命令就可以了。

### 3.4.clone克隆远程仓库内容

想象几个场景：你在家写完代码推送到远程之后，现在上班在公司电脑想接着写；你发工资了换了个新电脑要接着写；你电脑炸了…用另一个电脑接着写。

这是你就需要把项目从远程仓库克隆到本地。

1. 进入随意一个文件目录，运行 **git Bash**：

   ![](https://afeifeifei.github.io/class-demo/git/clone1.png)

2. 去远程仓库复制ssh，然后运行命令：

   ```
   git clone git@github.com:afeifeifei/myProject.git
   ```

   注意，此处地址别照抄。

   ![](https://afeifeifei.github.io/class-demo/git/clone2.png)

   完成之后可以看到 `myProject` 项目已经被克隆下来了。

### 3.5.pull拉取远程仓库内容

当你与同事协作开发时，他那部分的工作已经完成并且推送到远程了，你接下来的开发需要依赖他的代码，那么你需要更新你本地仓库的内容，使用命令 `git pull origin master` 从远程仓库拉取到本地。

### 3.6.git支持的协议

之前的操作中，每次在远程仓库复制 **SSH** 的时候，你可能已经注意到了还有 **HTTPS** 的选项。git也是支持 **HTTPS** 来建立本地与远程的链接的，不过每次传输都需要输入用户名与密码，相对来说比较麻烦。

## 4.分支管理

协作开发时，不可能每个人都在 **主分支master**（之前操作中，我们都是在主分支进行的，很多地方的截图我们可以看到master这个词）进行操作。因为开发中的代码，可能功能没完善有bug，这时如果大家都一股脑的把代码推送到主分支，可想而知那将是极其混乱。

这是git的分支功能的作用就体现出来了，我们可以先创建一个其他分支，在该分支上做开发，完成之后再推送到**主分支master**。

通常，**主分支master** 是一个项目至关重要的分支，我们只会把测试好的可以直接上线的版本提交到主分支，而开发中的功能，是不会提交到主分支的。

### 4.1.创建与切换分支

#### 4.1.1.branch创建分支

使用命令 `git branch 分支名` 来创建分支：

``` 
git branch dev
```

#### 4.1.2.checkout切换分支

使用命令 `git checkout 分支名` 来切换到另一个分支：

```
git checkout dev
```

#### 4.1.3.创建并切换到新分支

也就是说是上述两项操作的合体写法 `git checkout -b 分支名`。

#### 4.1.4.查看当前分支

使用命令 `git branch` 查看所有分支及当前所在分支：

![](https://afeifeifei.github.io/class-demo/git/branch.png)

### 4.2.merge合并分支

现在我们正处于 **dev** 分支，我们新增一个 **contact.html** 文件并提交：

![](https://afeifeifei.github.io/class-demo/git/branch2.png)

```
git add .
```

```
git commit -m "created contact.html"
```

![](https://afeifeifei.github.io/class-demo/git/branch3.png)

完成之后我们切换回主分支master：

```
git checkout master
```

![](https://afeifeifei.github.io/class-demo/git/branch4.png)

这时我们回到工作区会发现，**contact.html** 不见了：

![](https://afeifeifei.github.io/class-demo/git/branch5.png)

接下来我们把 **dev** 分支的内容合并到 **master**：

```
git merge dev
```

![](https://afeifeifei.github.io/class-demo/git/branch6.png)

回到工作区，我们会发现，**contact.html** 出现了：

![](https://afeifeifei.github.io/class-demo/git/branch7.png)

### 4.3.删除分支

合并完成之后，可以删除掉 **dev** 分支：

```
git branch -d dev
```

再查看所有分支时，就只有 **master**一个了：

```
git branch
```

![](https://afeifeifei.github.io/class-demo/git/branch8.png)

如果分支内容没有被合并过，那么想要丢弃该分支时，需要使用 `git branch -D 分支名`。

### 4.4.冲突处理

如果你在某个分支上修改了文件，切换回 **master** 分支之后，你又修改了对应的文件，这时你合并分支的话，可能会出现冲突问题。

1. 创建进入dev分支，在分支中修改文件并提交：

   ```
   git checkout -b dev
   ```

   ![](https://afeifeifei.github.io/class-demo/git/merge.png)

   ```
   git add .
   ```

   ```
   git commit -m "add tag<i>"
   ```

2. 切换回master分支，在分支中修改文件并提交

   ```
   git checkout master
   ```

   ![](https://afeifeifei.github.io/class-demo/git/merge2.png)

   ```
   git add .
   ```

   ```
   git commit -m "master add tag<i>"
   ```

3. 合并分支

   ```
   git merge dev
   ```

   出现冲突：

   ![](https://afeifeifei.github.io/class-demo/git/merge3.png)

   回到工作区可以看到，已经为我们表明了冲突内容，需要我们手动解决：

   ![](https://afeifeifei.github.io/class-demo/git/merge4.png)

   手动解决冲突之后，再 *添加、提交、删分支* 即可：

   ```
   git add .
   ```

   ```
   git commit -m "solve conflicts - add tag<i>"
   ```

   ```
   git branch -d dev
   ```


### 4.5.多人开发

多人协作开发过程中，项目常驻的两个分支一般是 **master** 和 **dev** ，一个为版本主分支，一个为开发的分支，大家都往 **dev** 里面推送内容。也就是说本地开发的分支不必要都推送到远程，你只需要把master和dev推送到远程就可以了。

#### 4.5.1.推送流程

1. 使用 `git push origin 分支名` 的方式，将自己的修改推送到远程
2. 如果推送失败，说明有同事比你先推送了一些更新，你需要合并分支了再推送，先使用`git pull`尝试合并；
3. 如果pull的时候提示 *no tracking* 错误，说明本地分支与远程没有进行关系，运行后面给出的提示命令就可以了 `git branch --set-upstream-to=origin/分支名 分支名` 。
4. 合并中如果遇到冲突，需要手动解决冲突，再本地提交，再使用 **流程1** 的命令 合并。

# 删除线上提交记录

版本回退

1、git reset --hard HEAD^

强制覆盖所有

2、git push origin --force
