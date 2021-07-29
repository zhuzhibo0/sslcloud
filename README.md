SSL监控系统，基于sslyze、djiango开发，可以检测证书过期时间、sha1签名算法、ccs、hsts、heartbleed、Poodle。并且可以进行邮件报警。

安装步骤：
进入sslyze-master
  python setup.py install  安装 sslyze
  
测试: sslyze_cli.py -h


安装django环境以及mysql 这里不再描述，自行查找。
django 安装完成后，初始化数据库。
python manage.py makemigrations
python manage.py migrate


启动服务：(主节点+检测节点 可以在多个机器上启动服务)
python manage.py runserver 0.0.0.0:80 
或者uwsgi+nginx方式。



启动后。进入admin后台
配置主节点信息：（所有节点都需要进行配置）
Setting ->server_settings
	Master address 主节点的ip地址信息
	port 提供http服务的端口。
	emailsender 邮件发送的发送者地址
	emailsmtp  smtp服务器地址
配置检测节点：(检测节点可以是多个，放在不同的地理位置，用于分布式处理，仅在主节点配置即可)
	Setting ->distribute_server
		Address ip地址
		port    http服务的端口
	有多少个节点就添加多少。
  
 
每个检测节点启动检测服务：
python checktask.py&
 
 
 小工具，随便写写
    


