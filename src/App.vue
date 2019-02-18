<template>
  <div id="app">
    <button @click="add">
      <span class="icon">➕</span>
      Add item
    </button>
    <draggable
      v-model="list"
      :options="draggableOptions"
      class="items-list"
      ref="list">
      <editable-item
        v-focus-on-insert
        v-for="(item, index) in items"
        :key="item.localId"
        :class="`item_${index}`"
        :item="item"
        :default-value="defaultTitle"
        @update="update"
        @remove="remove"
        @previousElement="previousElement"
        @nextElement="nextElement"/>
    </draggable>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Draggable from 'vuedraggable';
import EditableItem from './components/EditableItem.vue';

export default {
  name: 'app',
  components: {
    Draggable,
    EditableItem,
  },
  data() {
    return {
      defaultTitle: 'New Unit',
      draggableOptions: {
        animation: 200,
        handle: '.handle',
      },
    };
  },
  computed: {
    ...mapState('todo', ['items']),
    list: {
      get() {
        return this.items;
      },
      set(v) {
        this.setItems(v);
      },
    },
  },
  methods: {
    ...mapActions('todo', [
      'setItems',
      'add',
      'update',
      'remove',
    ]),
    previousElement(item) {
      const itemIndex = this.items.indexOf(item);
      if (this.items.length > 1) {
        this.remove(item);
        this.moveCaretAndFocus(
          document.querySelector(`.item_${itemIndex - 1} .content`),
        );
      }
    },
    nextElement(item) {
      const itemIndex = this.items.indexOf(item);
      if (itemIndex === (this.items.length - 1)) {
        this.add();
      } else {
        this.moveCaretAndFocus(
          document.querySelector(`.item_${itemIndex + 1} .content`),
        );
      }
    },
    moveCaretAndFocus(el) {
      const range = document.createRange();
      const sel = window.getSelection();
      const pos = Number(el.innerText.length);
      range.setStart(el.childNodes[0], pos);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
    },
  },
  directives: {
    'focus-on-insert': {
      inserted(el) {
        el.querySelector('.content').focus();
      },
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px auto;
  width: 400px;
}

button {
  border: unset;
  background: unset;
  font-size: 16px;
  color: rgb(151, 151, 151);
  cursor: pointer;

  &:hover {
    color: rgb(175, 175, 175);
  }

  &:focus {
    outline: none;
  }

  > .icon {
    margin-right: 6px;
  }
}

.items-list {
  margin: 10px 0 0 -23px;
}
</style>
