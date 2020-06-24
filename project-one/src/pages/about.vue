<template>
  <div class="about">
    <div class="top-img">
      <img src="../assets/about1.png" alt="图片加载中" />
      <div class="about-details">
        <router-link to="/">查看详情</router-link>
      </div>
    </div>
    <div class="about-words-descripe">
      <div class="about-title">
        <h2>公司简介</h2>
        <p>CONPANY&nbsp;PROFILE</p>
      </div>
      <div class="words">
        <p>嫣知，全球美妆正品集合店，隶属于成都美诺管理有限公司，美诺管理有限公司考察全球美妆潮流趋势，深刻洞悉中国大众对于美妆的全面需求和消费升级，创立嫣知品牌，集全球大美于一店，为国人带来国内外更齐全、更丰富、更专业、更优品的美妆产品。</p>
        <p>嫣知与全球24个国家战略合作，同300多个国际知名畅销品牌签署合作协议，并研发自有品牌产品线，不断扩充产品结构，以口红不同系列的全面覆盖国人需求，店内涵盖上万种爆款单品，是国内美妆集合店的行业翘楚，在国内外美妆行业有着举足轻重的影响。一站式全球购，国内外大牌+自营品牌，不出国门全球嗨购；全球美妆正品供货，承诺式退货换货机制；厂价直供让利消费者，保证超级低价优势！</p>
        <p>嫣知倡导“越爱美·越变美”的生活美学，邀请国际知名设计师进行品牌形象风格设计，打造时尚简约、充满格调的美学空间，为消费者提供体验式、自选式的导购服务，被业内人士誉为“中国美妆行业年度风云品牌”。</p>
      </div>
    </div>
    <div class="about-mid-img">
      <img src="../assets/about2.png" alt />
    </div>
    <div class="about-words-descripe">
      <div class="about-title">
        <h2>产品简介</h2>
        <p>PRODUCT&nbsp;INTRODUCTION</p>
      </div>
      <div class="words">
        <p>黑色亮漆般的金属外壳内，隐藏着一支如精美配饰般的唇膏。</p>
        <p>轻触瞬间，女性魅力立即呈现。极度轻柔舒适的质地在接触双唇的瞬间，立即能赋予双唇如丝缎般柔滑润泽的质感。同时它也是一支妆效精致、触感柔润的唇膏。选择任何一款属于你的炫亮唇色，从极度低调含蓄到极度张扬渴望，让你随时散发属于嫣知风格的优雅和女人味。</p>
        <p>嫣知魅力唇膏引发你的绝对魅力指数。它充分体现了在嫣知的世界中，唇膏历来便是精致优雅和极度女人味的象征。嫣知炫亮魅力唇膏完全颠覆了传统唇膏的惯用模式，让唇膏就象一款精美的配饰。无论白天或夜晚，无论自然或精致妆效，女性魅力立即完美展现。新增114号，43号，42号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
  }
};
</script>

<style lang="less">
.about {
  margin: 0;
  padding: 0;
  background: #f8f4f5;
  .top-img {
    width: 100%;
    position: relative;
    img {
      width: 100%;
    }
    .about-details {
      width: 10%;
      height: 30px;
      background: #5e0a12;
      text-align: center;
      position: absolute;
      top: 69%;
      right: 30%;
      padding: 3px;
      box-sizing: border-box;
      a {
        display: inline-block;
        height: 20px;
        color: white;
        font-size: 13px;
      }
    }
  }
  .about-words-descripe {
    width: 100%;
    padding: 50px;
    box-sizing: border-box;
    .about-title {
      width: 100%;
      height: 100px;
      margin: auto;
      text-align: center;
      box-sizing: border-box;
      padding: 20px;

      h2 {
        letter-spacing: 0.8rem;
      }
      p {
        color: #acabab;
        font-size: 12px;
        letter-spacing: 0.1rem;
        margin-right: 11px;
      }
    }

    .words {
      width: 60%;
      margin: auto;
      padding: 1px;
      p {
        text-indent: 2rem;
        margin-top: 40px;
        line-height: 2rem;
        font-family: "Microsoft YaHei";
        color: #3d3d3d;
      }
    }
  }
  .about-mid-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
