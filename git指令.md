# Git配置
```shell
git config [--global] user.name 你的名字
git config [--global] user.email 你的邮箱
```

# Git仓库初始化
```shell
进入到项目目录然后使用 git init
```

# Git增加文件到暂存区
```shell
git add file1,file2,file3....
添加所有工作区新内容到暂存区
git add .
```

# Git提交版本
```shell
git commit -m message
```

# Git远程仓库配置
```shell
先有本地仓库 后有远程仓库
git remote add origin https://github.com/pujiejie/admin_vue2.git/
git remote -v
```

# Git提交版本至远程库
```shell
git push [远程库名] [分支名]
git push origin master
```

# 时光旅行
```shell
查看所有版本信息
git log
git log --pretty=oneline
将Git仓库回退到指定版本
git reset --hard 版本号
```

# Git撤销
```shell
将暂存区的内容撤销到工作区
git restore --staged file1
```

# Git下载别人仓库
```shell
git clone https://github.com/pujiejie/admin_vue2.git/
```

# Git分支

# Git标签

# Git冲突解决
