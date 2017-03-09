<template>
   <div id="modal" >
        <div class="content" ref="content">
            <div class="content-header">
              <div class="close"><div @click="$emit('close')">×</div></div>
              <h3><slot name="title"></slot></h3>
            </div>
            <div class="content-body">
                <slot name="content"></slot>
            </div>
            <div class="content-footer">
              <button class="btn-default" @click="$emit('close')">取消</button>
              &nbsp;&nbsp;
              <button class="btn-default">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
function centerEle(ele){
    
}
export default {
  name: 'modal',
 // props:["option"],
  mounted:function(){
      var element = this.$refs.content
      var height = window.getComputedStyle(element,null).height.slice(0,-2)
      var width = window.getComputedStyle(element,null).width.slice(0,-2)
      var scrollTop = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop
      var clientHeight = document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight
      var clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth
      element.style.top = scrollTop + ((clientHeight - height)/2)+'px'
      element.style.left = (clientWidth - width)/2 + 'px'
  }
}
</script>

<style lang="sass">
#modal{
    position:absolute;
    width:100%;
    background:rgba(0,0,0,0.6);
    z-index: 100;
    height:100%;
    top:0;
    display:block;
    left:0;
    .content {
        width:90%;
        position: absolute;
        background:#fff;
        .content-header{
            height:60px;
            line-height:60px;
            background:#efefef;
            text-align:center;
            position:relative;
            color:#555;
            .close{
                position:absolute;
                top:-20px;
                left:calc(100% - 25px); 
                width:34px;
                margin:5px;
                height:34px;
                border-radius: 17px;
                background:#efefef;
                float:right;
                text-align: center;
                line-height:34px;
                font-weight: bold;
                &>div{
                     font-size: 120%;
                     cursor: pointer;
                    background:#1C86EE;
                    color:white;
                    line-height:28px;
                    height:28px;
                    width:28px;
                    border-radius:15px;
                    margin:3px;
                    &:hover{
                        font-size:150%;
                        font-weight:bold;
                        line-height:26px;
                    }
                }
            }
            h3{
                 margin:0;                                                    
            }
        }
        .content-body{
            padding:10px 0;
            div{
                margin:10px 0;
            }
        }
        .content-footer{
            clear:both;
            border-top:1px solid #efefef;
            padding:10px 0;
            text-align:center;
            button{
                width:40%;
            }
        }
    }
}
</style>
