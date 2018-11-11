import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Upload from '@/components/Upload.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Upload.vue', () => {
  it('mounts and creates the container element', () => {
    const wrapper = shallowMount(Upload);
    const container = wrapper.find('.container');
    expect(container.exists()).to.be.true;
    expect(container.text()).to.contain('Upload Your Model');
  });

  it('hides the progress bar by default', () => {
    const wrapper = shallowMount(Upload);
    const progress = wrapper.find('.progress');
    expect(progress.exists()).to.be.true;
    expect(progress.isVisible()).to.be.false;
  });
});
