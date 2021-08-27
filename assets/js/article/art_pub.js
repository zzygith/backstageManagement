$(function () {
    var layer = layui.layer
    var form = layui.form
    //Initialize rich editor
    /* initEditor() */
/*     tinymce.init({
    selector: 'textarea#default'
    }); */
/*     tinymce.init({
        selector: 'textarea#default',

        setup: function (editor) {
          editor.on('init', function () {
            editor.setContent('Using the on init stuff!');
          });
        }
      }); */

/*     if (sessionStorage.getItem('article') !== null) {
        console.log(JSON.parse(sessionStorage.getItem('article')))
        let artContent = JSON.parse(sessionStorage.getItem('article'));

        $('[name=title]').val(artContent.title);
        $('[name=cate_id]').val(artContent.cate_id);
        $('[placeholder="Please select article catagory"]').val($('[name=cate_id] option:selected').text())
        $('[name=content]').val(artContent.content);
    } */

//If edition is clicked, then execute this function. Get the edited article and show it in form.
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
                let artContent = res.data[0];
                    $('[name=title]').val(artContent.title);
                    $('[name=cate_id]').val(artContent.cate_id);
                $('[placeholder="Please select article catagory"]').val($('[name=cate_id] option:selected').text());
                tinymce.init({
                    selector: 'textarea#default',
                    setup: function (editor) {
                        editor.on('init', function () {
                            editor.setContent(artContent.content);
                      });
                    }
/*                     setup: function (editor) {
                        editor.on('init', areaT);
                    } */
                });
/*                 function areaT() {
                    tinymce.get("default").setContent(artContent.content); 
                } */
                sessionStorage.removeItem('editModel');
                editArticle();
                }
            })
    }else {
        tinymce.init({
            selector: 'textarea#default'
        });
        editArticle();
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


    function editArticle() {
    let art_state = 'submitted';
    //If click 'save as draft', then change the state
    $('#btnSave2').on('click', function () {
        art_state = 'draft';
    })

    $('#form_pub').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        var wwe = new Blob([''], { type: "image/png" });
/*         fd.append('cover_img', wwe); */
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('Failed to publish article')
                }
                layer.msg('Publish articles successfully');
                window.parent.$('.artList').click();

            }

        })


    })
}
/*     let art_state = 'submitted';
    //if click 'save as draft', then change the state
    $('#btnSave2').on('click', function () {
        art_state = 'draft';
    })

    $('#form_pub').on('submit', function (e) {
        e.preventDefault();
        console.log($(this).serialize());
        let fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        var wwe = new Blob([''], { type: "image/png" });
        //fd.append('cover_img', wwe); 
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


    }) */


})

