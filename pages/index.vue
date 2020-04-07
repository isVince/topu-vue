<template>
  <div class="page-list">
    <div>
      <div class="nav">
        <label>热门图文</label>
      </div>
      <div class="flex wrap">
        <div
          class="topo"
          v-for="(item, index) of data.list"
          :key="index"
          :title="item.desc"
          @click="onOpen(item)"
        >
          <div class="image">
            <img :src="item.image" />
          </div>
          <div class="ph15 pv10">
            <div class="title line one" :title="item.name">{{ item.name }}</div>
            <div class="desc line two mt5" :title="item.desc">{{ item.desc }}</div>
            <div class="flex mt5">
              <div class="full flex middle">
                <el-avatar
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  :size="24"
                ></el-avatar>
                <span class="ml5">{{ item.username }}</span>
              </div>
              <div>
                <span class="hover pointer mr15" title="赞">
                  <i
                    class="iconfont"
                    :class="{'iconfont icon-appreciate':!item.stared, 'iconfont icon-appreciatefill':item.stared}"
                  ></i>
                  <span class="ml5">{{ item.star || 0 }}</span>
                </span>
                <span class="hover pointer" title="收藏">
                  <i
                    class="iconfont"
                    :class="{'iconfont icon-like':!item.favorited, 'iconfont icon-likefill':item.favorited}"
                  ></i>
                  <span class="ml5">{{ item.hot || 0 }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-pagination
          @current-change="getList"
          :current-page="search.pageIndex"
          :page-size="8"
          layout=" prev, pager, next, jumper, total"
          :total="data.count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        list: [],
        count: 0
      },
      search: {
        pageIndex: 1,
        pageCount: 8
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.data = await this.$axios.$get(
        `/api/topologies?pageIndex=${this.search.pageIndex}&pageCount=${this.search.pageCount}`
      )
    },
    onOpen(item) {
      this.$router.push({ path: '/workspace', query: { id: item.id } })
    }
  }
}
</script>

<style lang="scss">
.page-list {
  background-color: #e7e7e7;
  width: 100vw;
  height: 100%;
  padding: 0 0.3rem;
  overflow: auto;

  .nav {
    margin: 0.2rem 0.1rem 0.05rem 0.1rem;
  }

  & > div {
    max-width: 12rem;
    margin: auto;
  }
}

.topo {
  position: relative;
  width: calc(25% - 0.2rem);
  height: 3rem;
  margin: 0.1rem;
  border-radius: 2px;
  background-color: #fff;

  .image {
    padding: 0.1rem 0.1rem 0.15rem 0.1rem;
    text-align: center;
    height: 1.85rem;
    border-bottom: 1px solid #f7f7f7;
    cursor: pointer;

    img {
      height: 100%;
      max-width: 100%;
    }
  }

  .title {
    font-size: 0.16rem;
    line-height: 0.24rem;
    height: 0.24rem;
    cursor: pointer;
  }

  .desc {
    font-size: 0.12rem;
    line-height: 0.16rem;
    height: 0.32rem;
  }

  .iconfont {
    font-size: 0.16rem;
  }

  textarea {
    &.input {
      min-width: 0.3rem;
      width: 100%;
      max-width: 100%;
      font-size: 0.1rem;
      padding: 0.02rem 0.05rem;
      resize: none;
    }
  }

  .icon-delete {
    position: absolute;
    top: 0.05rem;
    right: 0.1rem;
  }
}
</style>
