import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Tasks from '@/components/Tasks.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Tasks.vue', () => {
  it('mounts and creates the container element', () => {
    const store = new Vuex.Store({
      state: { tasks: [] },
    });
    const wrapper = shallowMount(Tasks, { store, localVue });
    expect(wrapper.find('.container').exists()).to.be.true;
  });

  it('contains a task row when one exists in the store', () => {
    const store = new Vuex.Store({
      state: {
        tasks: [{ filename: 'TestTask' }],
      },
    });
    const wrapper = shallowMount(Tasks, { store, localVue });
    expect(wrapper.find('.container').text()).to.contain('TestTask');
  });
});
