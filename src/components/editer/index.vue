<template>
  <div id="edit-content">
    <Editor v-model="contentVal" :init="initOpt" />
  </div>
</template>

<script setup >
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Editor from "@tinymce/tinymce-vue";
//引入node_modules里的tinymce相关文件文件
import tinymce from "tinymce/tinymce"; //tinymce默认hidden，不引入则不显示编辑器
import "tinymce/themes/silver"; //编辑器主题，不引入则报错
import "tinymce/icons/default"; //引入编辑器图标icon，不引入则不显示对应图标
import "tinymce/models/dom";
import "tinymce/skins/content/default/content.css";
import "tinymce/plugins/advlist"; //高级列表
import "tinymce/plugins/anchor"; //锚点
import "tinymce/plugins/autolink"; //自动链接
import "tinymce/plugins/autoresize"; //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import "tinymce/plugins/autosave"; //自动存稿
import "tinymce/plugins/charmap"; //特殊字符
import "tinymce/plugins/code"; //编辑源码
import "tinymce/plugins/codesample"; //代码示例
import "tinymce/plugins/directionality"; //文字方向
import "tinymce/plugins/emoticons"; //表情
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/help"; //帮助
import "tinymce/plugins/image"; //插入编辑图片
import "tinymce/plugins/importcss"; //引入css
import "tinymce/plugins/insertdatetime"; //插入日期时间
import "tinymce/plugins/link"; //超链接
import "tinymce/plugins/lists"; //列表插件
import "tinymce/plugins/media"; //插入编辑媒体
import "tinymce/plugins/nonbreaking"; //插入不间断空格
import "tinymce/plugins/pagebreak"; //插入分页符
import "tinymce/plugins/preview"; //预览
import "tinymce/plugins/quickbars"; //快速工具栏
import "tinymce/plugins/save"; //保存
import "tinymce/plugins/searchreplace"; //查找替换
import "tinymce/plugins/table"; //表格
import "tinymce/plugins/visualblocks"; //显示元素范围
import "tinymce/plugins/visualchars"; //显示不可见字符
import "tinymce/plugins/wordcount"; //字数统计

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const contentVal = ref("");

const initOpt = ref({
  language_url: "/tinymce/langs/zh-Hans.js", //引入语言包文件
  language: "zh-Hans", //语言类型
  toolbar_mode: true,
  skin_url: "/tinymce/skins/ui/oxide", //皮肤：浅色
  plugins:
    "preview searchreplace autolink directionality visualblocks visualchars  image link media code codesample table charmap  pagebreak nonbreaking anchor insertdatetime advlist lists wordcount autosave ", //插件配置
  toolbar:
    " undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
                styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                table image media charmap  pagebreak insertdatetime  preview | code selectall searchreplace visualblocks | indent2em lineheight formatpainter axupimgs", //工具栏配置，设为false则隐藏
  fontsize_formats:
    "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px", //字体大小
  font_formats:
    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;", //字体样式
  lineheight_formats: "0.5 0.8 1 1.2 1.5 1.75 2 2.5 3 4 5", //行高配置，也可配置成"12px 14px 16px 20px"这种形式
  height: 400, //注：引入autoresize插件时，此属性失效
  placeholder: "在这里输入文字",
  branding: false, //tiny技术支持信息是否显示
  resize: false, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
  // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
  elementpath: false, //元素路径是否显示
  content_style: "img {max-width:100%;} video {max-width:100%;}", //直接自定义可编辑区域的css样式
  paste_data_images: true,
  video_template_callback: (data) => {
    return `
    <video style="width: ${data.width}px; height: ${data.height}px;" controls="controls" width="${data.width}" height="${data.height}">
       <source src="${data.source}" type="${data.sourcemime}">
    </video>
    `;
  },
  file_picker_callback: (callback, value, meta) => {
    console.log("meta.filetype-->", meta.filetype);

    if (meta.filetype === "media") {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", ".mp4");
      input.onchange = (e) => {
        const { files } = e.path[0];

        const file = files[0];
        let params = new FormData();
        params.append("file", file);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        axios
          .post(`/api/admin/Article/UploadVideo`, params, config)
          .then((res) => {
            if (res.data.status == 1) {
              const url = res.data.data[0];
              callback("https://crlc.gaing.cn" + url); //上传成功，在成功函数里填入图片路径
            }
          });
      };

      input.click();
    } else if (meta.filetype === "image") {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.onchange = (e) => {
        const { files } = e.path[0];

        const file = files[0];
        let params = new FormData();
        params.append("file", file);

        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        axios
          .post(`/api/admin/Article/UploadPicture`, params, config)
          .then((res) => {
            if (res.data.status == 1) {
              const url = res.data.data[0];
              callback("https://crlc.gaing.cn" + url); //上传成功，在成功函数里填入图片路径
            }
          });
      };
      input.click();
    }
  },
  images_upload_handler: async (blobInfo, p) => {
    return new Promise((success, reject) => {
      if (blobInfo.blob().size / 1024 / 1024 > 5) {
        reject("上传失败，图片大小请控制在 2M 以内");
      } else {
        let params = new FormData();
        params.append("file", blobInfo.blob());
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        axios
          .post(`/api/admin/Article/UploadPicture`, params, config)
          .then((res) => {
            console.log("res-->", res.data);
            if (res.data.status == 1) {
              const url = res.data.data[0];
              success("https://crlc.gaing.cn" + url); //上传成功，在成功函数里填入图片路径
            } else {
              reject("上传失败");
            }
          })
          .catch(() => {
            reject("上传失败");
          });
      }
    });
  },
});

function init() {
  contentVal.value = props.modelValue;
}

watch(contentVal, () => {
  emit("update:modelValue", contentVal.value);
});
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped  >
@import "./index.scss";
</style>