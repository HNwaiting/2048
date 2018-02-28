//定义总行数，总列数
var rn=4,cn=4;
var data;//定义二维数组

//初始化函数
function start() {
    data=[];
    //数组遍历
    for(var r=0;r<rn;r++){
        //将数字循环压入数组
        data.push([]);
        for(var c=0;c<cn;c++){
            data[r][c]= 0;
        }
    }
    //随机生成 2个2或4
    randomNumber();
    randomNumber();
    updateView();
    //为页面添加键盘按下时间处理函数
    document.onkeydown=function (e) {
       switch (e.keyCode){
           case 37:
               moveLeft();
               break;
            case 38:
                //moveUp();
               break;
            case 39:
                moveRight();
               break;
            case 40:
                //moveDown();
               break;
       }
    }
}

//随机位置生成2或4
function randomNumber() {
    //反复
    while (true) {
        //在0-rn之间生成一个随机整数保存在r中
        var r = parseInt(Math.random()*rn);
        //在0-cn之间生成一个随机整数保存在c中
        var c = parseInt(Math.random()*cn);
        //在没有数字的地方放置数字 r/c值为0
        if(data[r][c]===0){
            //为data中r行c列实际保存一个2或4
            data[r][c]=Math.random()<0.8?2:4;
            //退出循环
            break;
        }
    }
}

//写入界面
//将元素填写到对应的页面当中
function updateView() {
    //遍历data
    for(var r=0;r<rn;r++){
        for(var c=0;c<cn;c++){
            //拼接一个id
            var id = "c"+ r + c;
            //按id查找
            var div = document.getElementById(id);
            //数值不为0时写入到页面中
            if(data[r][c]!==0){
            //将数值保存到页面中
            div.innerHTML=data[r][c];
            //设置div的class为n+data[r][c]
                div.className="n"+data[r][c];
            }
            else{
                div.innerHTML='';
                div.className='';
            }
        }
    }
}

//向左移动
function moveLeft() {
    //将data转为字符串保存在before中
    var before = String(data);
    for (var r = 0; r < rn; r++) {
        moveLeftInRow(r);//向左移动r行
    }
        var after = String(data);
        //如果发生变化
        if (before !== after) {
            //再生成新数字，更新界面
            randomNumber();
            updateView();
        }
}
//左移第r行
function moveLeftInRow(r) {
    for (var c = 0; c < cn - 1; c++) {
        var nextC = getNextcInRow(r, c);
        if (nextC === -1) {
            break;
        }
        else {
            if (data[r][c] === 0) {
                data[r][c] = data[r][nextC];
                data[r][nextC] = 0;
                //抵消for循环里面的++,事C位置不变
                c--;
            } else if (data[r][c] === data[r][nextC]) {
                data[r][c]*= 2;
                data[r][nextC] = 0;
            }
        }
    }
}
function getNextcInRow(r, c) {
        //nextc从c+1开始,到cn结束
        for (var nextC = c + 1; nextC < cn; nextC++) {
            //如果data中r行nextc位置不等于0
            if (data[r][nextC] !== 0) {
                //返回nextc
                return nextC;
            }
        }
        //否则返回-1;
            return -1;

}

//向右移动
function moveRight() {
    var before = String(data);
    for (var r = 0; r < rn; r++) {
        moveRightInRow(r);//向左移动r行
    }
    var after = String(data);
    //如果发生变化
    if (before !== after) {
        //再生成新数字，更新界面
        randomNumber();
        updateView();
    }
}
function moveRightInRow(r) {
    for(c=cn-1;c>0;c--){
       var beforeC = getBeforecInRow(r,c);
        if (beforeC === -1) {
            break;
        }
        else {
            if (data[r][c] === 0) {
                data[r][c] = data[r][beforeC];
                data[r][beforeC] = 0;
                //抵消for循环里面的++,事C位置不变
                c++;
            } else if (data[r][c] === data[r][beforeC]) {
                data[r][c]*= 2;
                data[r][beforeC] = 0;
            }
        }

    }
}
function getBeforecInRow(r,c) {
    //beforec从cn-1开始,到0结束
    for (var beforeC = c-1; beforeC>=0; beforeC--) {
        //如果data中r行nextc位置不等于0
        if (data[r][beforeC] !== 0) {
            //返回nextc
            return beforeC;
        }
    }
    //否则返回-1;
    return -1;
}

//向上移动
function moveUp() {
    var before = String(data);
    for (c=0;c<cn;c++){
        moveUpInCol(c);
    }
    var after = String(data);
    //如果发生变化
    if (before !== after) {
        //再生成新数字，更新界面
        randomNumber();
        updateView();
    }
}

function moveUpInCol(c) {
    for(r=0;r<rn;r++){
        var nextR = getNextcInRow(r, c);
        if (nextR === -1) {
            break;
        }
        else {
            if (data[r][c] === 0) {
                data[r][c] = data[nextR][c];
                data[nextR][c] = 0;
                //抵消for循环里面的++,事C位置不变
                c--;
            } else if (data[r][c] === data[nextR][c]) {
                data[r][c]*= 2;
                data[nextR][c] = 0;
            }
        }
    }
}
start();