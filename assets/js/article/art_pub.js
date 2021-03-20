$(function () {
    var layer = layui.layer
    var form = layui.form
    //Initialize rich editor
    initEditor()


    if (sessionStorage.getItem('article') !== null) {
        console.log(JSON.parse(sessionStorage.getItem('article')))
        let artContent = JSON.parse(sessionStorage.getItem('article'));

        $('[name=title]').val(artContent.title);
        $('[name=cate_id]').val(artContent.cate_id);
        $('[placeholder="Please select article catagory"]').val($('[name=cate_id] option:selected').text())
        $('[name=content]').val(artContent.content);
    }





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
                sessionStorage.removeItem('article');
                window.parent.$('.artList').click();

            }

        })


    })


})

