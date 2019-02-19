<template>
  <div id="app">
    <button @click="add">
      <span class="icon icon-plus icon-wt"/>
      Add item
    </button>
    <draggable
      v-model="list"
      :options="draggableOptions"
      :class="{ 'drag-active' : dragActive }"
      class="items-list"
      ref="list"
      @start="dragActive = true"
      @end="dragActive = false">
      <editable-item
        v-focus-on-insert
        v-for="(item, index) in items"
        :key="item.localId"
        :class="`item_${index}`"
        :item="item"
        @update="update"
        @toggle="toggle"
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
      dragActive: false,
      draggableOptions: {
        animation: 150,
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
      'toggle',
      'remove',
    ]),
    previousElement(item) {
      const itemIndex = this.items.indexOf(item);
      if (this.items.length > 1) {
        this.remove(item);
        this.moveCaretAndFocus(itemIndex - 1);
      }
    },
    nextElement(item) {
      const itemIndex = this.items.indexOf(item);
      if (itemIndex === (this.items.length - 1)) {
        this.add();
      } else {
        this.moveCaretAndFocus(itemIndex + 1);
      }
    },
    moveCaretAndFocus(index) {
      const el = document
        .querySelector(`.item_${index} .content`);
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
