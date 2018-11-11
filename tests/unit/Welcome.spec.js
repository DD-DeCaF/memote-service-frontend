import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Welcome from '@/components/Welcome.vue';

describe('Welcome.vue', () => {
  it('mounts and creates the container element', () => {
    const wrapper = shallowMount(Welcome);
    expect(wrapper.find('.container').exists()).to.be.true;
  });
});
