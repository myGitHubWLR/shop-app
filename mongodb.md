 * Mongodb
* 1.常用命令
    mongo 进入命令行
    变量 var
    函数function
    输出print
    显示数据库show dbs
    进入/创建 数据库 use shop
    显示集合 show collections
    显示当前数据库 db

* 2.常用命令
    插入 db.user.insert()
    查询 db.user.find()
    查询 db.user.findOne()
    修改 db.user.update({查询条件},{修改})
    删除 db.user.remove(条件)
    删除集合 db.user.drop()
    删除数据库 db.dropDatabase()

    加载js文件 load('./xx.js')

* 数据更新 update
    $set db.user.update({查询条件},{$set:{修改的值})
    $unset 删除对应的key,value值
    upsert 如果有对应的属性则进行更新，没有则新加入｛upsert:true｝
    multi 
    $push 增加新数据(不会对原有数据进行检查)
    $addToSet （会对原有数据进行检查，如果已有，则不进行修改）
    $each
    $set
    findAndModify 查找并修改

* 数据查询 find
    $lt $gt $lte $gte 小于 大于 小于等于 大于等于
    $in
    $or $and $not 或 与 非 
    数组 $all $in $size
    分页 limit skip sort 从第几页开始，从第几条 ，升降序

    js forEach