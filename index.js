// 刪除微博的用戶id
  var userId = '5622195893'
  //  批量刪除的微博 都有一些相同的關鍵
  var delKey = '#扇贝打卡# '
  if(location.pathname.indexOf(userId) !== -1){
    deleteWeibo()
  }

  function  deleteWeibo(){
    var box = document.querySelector('#Pl_Official_MyProfileFeed__22')
    var topics = box.querySelectorAll('div.WB_text.W_f14')
    var nextPage = box.querySelectorAll('a.page.next.S_txt1.S_line1')


    topics = Array.prototype.slice.call(topics)
    if(topics && topics.length){
      var delBtn = topics.filter(function(item){
        return item.innerText.indexOf(delKey) !== -1
      }).map(function(item){
        return item.parentNode.previousElementSibling.firstElementChild.lastElementChild.firstElementChild.firstElementChild.firstElementChild
      })

      delBtn.forEach(function(item){
        comfirmDel()
        deleteItem(item,comfirmDel(function(){
          return quickly()
        }))
      })

      var h = setInterval(function(){
        var newTopics = Array.prototype.slice.call(box.querySelectorAll('div.WB_text.W_f14'))
        if(newTopics && newTopics.length){
          clearInterval(h)
          deleteWeibo()
        }else{
          var de = document.documentElement || document.body
          scrollTop = de.scrollHeight - de.clientHeight
          window.scroll(0,scrollTop) 
          if(nextPage && nextPage.length){
            nextPage[0].click()
          }
        }
      },2000)
      
    }
  }

  //點擊刪除按鈕
  function deleteItem(item,cb){
    item.click()
    cb && cb()
  }
  // 確認刪除按鈕
  function comfirmDel(cb){
    var box = document.querySelector('#Pl_Official_MyProfileFeed__22')
    var theConfirmBtn = box.querySelector('a.W_btn_a:not(.btn_22px)')
    theConfirmBtn && theConfirmBtn.click()
    cb && cb()
  }
  // 程序刪微博  微博會提示操作過快  點擊確定 繼續刪
  function quickly(){
    var quicklyBtn = document.querySelector('a.W_btn_b.btn_34px')
    if(quicklyBtn){
      console.log(quicklyBtn)
      quicklyBtn.click()
    }
  }
