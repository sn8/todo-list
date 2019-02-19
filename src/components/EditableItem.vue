<template>
  <div
    class="editable-item"
    :class="{ 'done' : item.done }">
    <button class="handle">
      <span class="icon icon-grip"/>
    </button>
    <button
      class="remove"
      @click="remove">
      <span class="icon icon-times"/>
    </button>
    <button
      class="check"
      @click="toggle">
      <span class="icon icon-check"/>
    </button>
    <div
      data-placeholder="Start typing..."
      ref="content"
      class="content"
      contenteditable="true"
      @input="update"
      @keyup.8="previousElement"
      @keyup.enter="nextElement"
      @keydown.enter.prevent>{{ content }}</div>
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
  },
  data() {
    return {
      content: '',
      waitSecondBackspace: false,
    };
  },
  mounted() {
    this.content = this.item.content;
  },
  methods: {
    update() {
      const { item } = this;
      const { innerText: content } = this.$refs.content;
      this.$emit('update', { item, content });
    },
    toggle() {
      this.$emit('toggle', this.item);
    },
    remove() {
      this.$emit('remove', this.item);
    },
    previousElement() {
      const { item, waitSecondBackspace } = this;
      const { innerText: content } = this.$refs.content;
      if (content.length === 0) {
        if (!waitSecondBackspace) {
          this.waitSecondBackspace = true;
        } else {
          this.waitSecondBackspace = false;
          this.$emit('previousElement', item);
        }
      }
    },
    nextElement() {
      this.$emit('nextElement', this.item);
    },
  },
};
</script>
