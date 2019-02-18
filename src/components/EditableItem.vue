<template>
  <div class="editable-item">
    <div class="handle">⋮</div>
    <div class="remove">
      <button @click="remove">❌</button>
    </div>
    <div
      :data-placeholder="defaultValue"
      ref="content"
      class="content"
      contenteditable="true"
      @input="update"
      @blur="setDefaultTitle"
      @keyup.delete="previousElement"
      @keyup.enter="nextElement"
      @keydown.enter.prevent>{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'EditableItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    defaultValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: '',
      waitSecondBackspace: false,
    };
  },
  mounted() {
    this.title = this.item.title;
  },
  methods: {
    update(event) {
      const { item } = this;
      this.$emit('update', {
        item,
        title: event.target.innerText,
      });
    },
    remove() {
      const { item } = this;
      this.$emit('remove', item);
    },
    previousElement() {
      const { item, waitSecondBackspace } = this;
      if (item.title.length === 0) {
        if (!waitSecondBackspace) {
          this.waitSecondBackspace = true;
        } else {
          this.waitSecondBackspace = false;
          this.$emit('previousElement', item);
        }
      }
    },
    nextElement() {
      const { item } = this;
      this.setDefaultTitle();
      this.$emit('nextElement', item);
    },
    setDefaultTitle() {
      const { item, defaultValue } = this;
      if (item.title.length === 0) {
        this.title = defaultValue;
        this.$emit('update', {
          item,
          title: defaultValue,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.editable-item {
  display: flex;
  padding: 5px 8px;

  > .handle,
  > .remove {
    visibility: hidden;
    width: 18px;
    text-align: center;
    color: rgb(151, 151, 151);
  }

  > .handle {
    cursor: move;
  }

  > .content {
    width: 100%;
    margin-left: 7px;
    padding: 2px;

    &:focus {
      outline: none;
    }

    &[contenteditable=true]:empty:focus::before {
      content:attr(data-placeholder);
      color: rgb(167, 167, 167);
    }
  }

  &:hover {
    > .handle,
    > .remove {
      visibility: visible;
    }
  }
}
</style>
