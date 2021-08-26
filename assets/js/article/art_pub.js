$(function () {
    var layer = layui.layer
    var form = layui.form
    //Initialize rich editor
    /* initEditor() */
    tinymce.init({
    selector: 'textarea#default'
  }); 

/*     if (sessionStorage.getItem('article') !== null) {
        console.log(JSON.parse(sessionStorage.getItem('article')))
        let artContent = JSON.parse(sessionStorage.getItem('article'));

        $('[name=title]').val(artContent.title);
        $('[name=cate_id]').val(artContent.cate_id);
        $('[placeholder="Please select article catagory"]').val($('[name=cate_id] option:selected').text())
        $('[name=content]').val(artContent.content);
    } */

    if (sessionStorage.getItem('editModel')) {
        let edi_id = sessionStorage.getItem('editModel');
        $.ajax({
                method: 'GET',
                url: '/my/article/' + edi_id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('Failed to delete article')
                    }
                    layer.msg('Load article successfully')
                    let artContent = res.data;
                    $('[name=title]').val(artContent.title);
                    $('[name=cate_id]').val(artContent.cate_id);
                    $('[placeholder="Please select article catagory"]').val($('[name=cate_id] option:selected').text());
                    tinymce.get("default").setContent(artContent.content);
                    sessionStorage.removeItem('editModel');
                }
            })


    }

/*             $.ajax({
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
            }) */



    let art_state = 'submitted';
    //if click 'save as draft', then change the state
    $('#btnSave2').on('click', function () {
        art_state = 'draft';
    })

    $('#form_pub').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        var wwe = new Blob([''], { type: "image/png" });
        fd.append('cover_img', wwe);
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('Failed to publish article')
                }
                layer.msg('Publish articles successfully');
                window.parent.$('.artList').click();

            }

        })


    })


})

