# WorkFlow framework
## 功能
* [echo](#echo)
* [wake on LAN](#wake-on-lan)
* [ping](#ping)
## 進階功能
* [wait](#wait)

## echo
> POST:http://localhost:3000/

**request body**
```javascript
{
    "version":"1.0",
    "type":"direct",
    "workflow":"example",
    "main":"task1",
    "tasks":{
    	"task1":{   
            "descript":"task1-1",
            "action":"shell",
            "data":"echo task1-1 > ./test/task1-1.txt",
            "on_success":"task2",
            "on_error":null
        },
        "task2":{
        	"descript":"wakeOnLan",
            "action":"shell",
            "data":"echo task1-2 > ./test/task1-2.txt",
            "on_success":"task3",
            "on_error":null
        },
        "task3":{
            "descript":"task1-3",
            "action":"shell",
            "data":"echo task1-3 > ./test/task1-3.txt",
            "on_success":null,
            "on_error":null
        }
    }
}
```
## wake on LAN
> POST:http://localhost:3000/

**request body**
```javascript
{
    "version":"1.0",
    "type":"direct",
    "workflow":"example",
    "main":"task1",
    "tasks":{
    	"task1":{   
            "descript":"task1",
            "action":"wakeOnLan",
            "data":"a0:48:1c:a0:6e:7d",
            "on_success":null,
            "on_error":null
        }
    }
}
```

## ping
> POST:http://localhost:3000/

**request body**
```javascript
{
    "version":"1.0",
    "type":"direct",
    "workflow":"example",
    "main":"task1",
    "tasks":{
    	"task1":{   
            "descript":"task1",
            "action":"ping",
            "data":"192.168.2.96",
            "on_success":null,
            "on_error":null
        }
    }
}
```

## wait
> POST:http://localhost:3000/

|Key|Value|default|function|
|---|----|----|----|
|wait|Boolean|pass|是否需等待任務成功|
|time|Int|1|間隔執行時間(s)|
|max |Int|0|最多嘗試次數|

**request body**
```javascript
{
    "version":"1.0",
    "type":"direct",
    "workflow":"example",
    "main":"task1",
    "tasks":{
    	"task1":{   
            "descript":"task1",
            "action":"wakeOnLan",
            "data":"a0:d3:c1:0b:2d:81",
            "on_success":"task2",
            "on_error":null
        },
        "task2":{   
            "descript":"task2",
            "action":"ping",
            "data":"192.168.2.99",
            "wait":{
            	"wait":true,
            	"time":4,
            	"max":40
            },
            "on_success":null,
            "on_error":null
        }
    }
}
```