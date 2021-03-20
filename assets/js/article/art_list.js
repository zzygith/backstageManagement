$(function () {
    var laypage = layui.laypage;
    let q = {
        pagenum: 1, //Page number, defualt is the first number.
        pagesize: 10, //How many articles in one page, default is 2
        cate_id: '', //Category ID for filter
        state: ''//Publish state of articles
    }

    //Define filter to beautify time format
    template.defaults.imports.dataFormat = function (data) {
        const addZero = num => num < 10 ? '0' + num : num;
        const dt = new Date(data);
        let y = dt.getFullYear();
        let m = addZero(dt.getMonth());
        let d = addZero(dt.getDate());
        let hh = addZero(dt.getHours());
        let mm = addZero(dt.getMinutes());
        let ss = addZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }

    initTable();

    //Get the article lists function
    function initTable() {

        //添加分类
        /*             let tianjia = {
                name: 'Politics',
                alias: 'wuwu'
            }
                $.ajax({
                    method: 'POST',
                    url: '/my/article/addcates',
                    data: tianjia,
                    success: function (res) {
                        console.log('添加分类');
                        console.log(res);
                    }
                }) */


        //删除分类
        /*         $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + 1,
                    success: function (res) {
                        console.log('删除分类');
                        console.log(res);
                    }
                }) */


        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('Failed to get article list')
                }
                res.data = res.data.reverse();
                console.log(res.data)
                //Use template engine to render page
                let htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                //renderPage(res.total)
            }
        })


        //页码
        /*         function renderPage(total) {
                    laypage.render({
                        elem: 'pageArea' //注意，这里的 test1 是 ID，不用加 # 号
                        , count: total, //数据总数，从服务端得到
                        limit: q.pagesize,
                        curr: q.pagenum
                    })
                } */


    }

    $('tbody').on('click', '.btn-delete', function () {
        let del_id = $(this).attr('data-id')
        layer.confirm('Are you sure to delete this article?', { icon: 3, title: 'Info', btn: ['Yes', 'Cancel'] }, function (index) {
            //If yes
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + del_id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('Failed to delete article')
                    }
                    layer.msg('Delete article successfully')
                    initTable();
                }
            })

            layer.close(index);

        });
    })

    $('tbody').on('click', '.btn-edit', function () {
        let edi_id = $(this).attr('data-id')
        layer.confirm('Are you sure to edit this article?', { icon: 3, title: 'Info', btn: ['Yes', 'Cancel'] }, function (index) {
            //If yes
            $.ajax({
                method: 'GET',
                url: '/my/article/' + edi_id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('Failed to delete article')
                    }
                    layer.msg('Load article successfully')
                    // sessionStorage.setItem('article', res.data);
                    sessionStorage.setItem('article', JSON.stringify(res.data));
                    //Skip to publish article page
                    window.parent.$('.pubArt').click();
                }
            })

            layer.close(index);

        });
    })


})
