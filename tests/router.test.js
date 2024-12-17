// tests/router.spec.js

import { createRouter, createWebHistory } from 'vue-router';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AddEmployee from '../src/views/EmsAddView.vue';
import EmployeeList from '../src/views/EmsListView.vue';
import Login from '../src/views/LoginView.vue';
import EditEmployee from '../src/views/EmsEditView.vue';
import router from '../src/router';

describe('router', () => {
  it('renders the login page on /views/LoginView', async () => {
    
    
    const wrapper = mount(Login, {
      global: {
        plugins: [router]
      }
    });
    router.push('/login');
    await router.isReady();
    
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the employee list page on /views/EmsListView', async () => {
    router.push('/');
    await router.isReady();
    
    const wrapper = mount(empList, {
      global: {
        plugins: [router]
      }
    });
    
    expect(wrapper.exists()).toBe(true);
  });

});
