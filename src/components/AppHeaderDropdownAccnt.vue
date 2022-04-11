<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" :caret="false">
      {{email}} <span class="caret"></span>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownItem  @click="accountSetting"> <CIcon icon="cil-settings"/> アカウント設定 </CDropdownItem>
      <CDropdownItem @click="logout"> <CIcon icon="cil-lock-locked" /> ログアウト </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/8.jpg'
import { defineComponent, ref } from 'vue'
import AuthRepository from '@/repositories/AuthRepository.vue';
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
    setup() {
        const router = useRouter()
        const logout = async () => {
            await AuthRepository.get("auth/logOut"
            ).then((result) => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_info');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('contractId');
                router.push({ name: 'Login' })
            })
        }
        const accountSetting = () => {
          router.push({ name: 'AccountSetting' })
        }
        const email = JSON.parse(localStorage.getItem('user_info')).email;

        return {logout, avatar, email, accountSetting }
    },
})

</script>
<style scoped>
.dropdown {
  border: 1px solid #C7C7C7;
  box-sizing: border-box;
  border-radius: 10px;
}
.dropdown-menu {
  background: #FFFFFF;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  inset: 0px 0px auto auto !important;
}

.dropdown-item {
  padding: 0.5rem 1rem;
}

.caret:before {
  content: '';
  position: absolute;
  top: 1rem;
  right: 0.5rem;
  border-top: 5px solid #9C9C9C;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}
</style>
