import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/App.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('App.vue', () => {
  it('mounts and creates the app container', () => {
    const store = new Vuex.Store({
      state: { tasks: [] },
      actions: { readTasks() {} },
    });
    const wrapper = shallowMount(App, { store, localVue });
    expect(wrapper.find('#app').exists()).to.be.true;
  });
});
