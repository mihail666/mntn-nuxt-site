<template>
  <VAppBar class="px-md-5">
    <VIcon
      icon="logos:kaios"
      size="100"
      class="ml-3"
      @click="navigateTo('/')"
    />

    <VSpacer />
    <!-- Theme switcher -->
    <VBtn
      @click="toggleTheme"
      class="mr-2"
      icon
    >
      <VIcon
        class="text-medium-emphasis"
        icon="fluent:weather-sunny-24-regular"
      />
    </VBtn>
    <!-- Language Switcher -->
    <v-menu width="180">
      <template v-slot:activator="{ props }">
        <VBtn
          class="mr-2"
          v-bind="props"
          icon
        >
          <VIcon
            v-if="selectedLanguage"
            class="text-medium-emphasis"
            :icon="selectedLanguage?.icon"
          />
        </VBtn>
      </template>
      <VCard
        rounded="lg"
        class="shadow"
      >
        <VList>
          <VListSubheader>Select language</VListSubheader>
          <v-list-item
            @click="selectedLanguage = item"
            class="mx-2 mb-2 rounded-lg"
            density="comfortable"
            v-for="item in languages"
            :key="item.title"
            :value="item"
          >
            <template #prepend>
              <VIcon
                :icon="item.icon"
                size="22"
                class="mr-4"
              />
            </template>
            <v-list-item-title class="text-subtitle-2">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </VList>
      </VCard>
    </v-menu>
    <!-- notification -->
    <v-menu width="400">
      <template v-slot:activator="{ props }">
        <VBtn
          class="mr-2"
          v-bind="props"
          icon
        >
          <v-badge
            v-if="notificationCount"
            :content="notificationCount"
            color="primary"
          >
            <VIcon
              class="text-medium-emphasis"
              icon="fluent:alert-24-regular"
            />
          </v-badge>
          <VIcon
            class="text-medium-emphasis"
            v-else
            icon="fluent:alert-24-regular"
          />
        </VBtn>
      </template>
      <VCard
        rounded="lg"
        class="shadow"
      >
        <VCardTitle class="d-flex align-center justify-space-between">
          <span class="font-weight-bold text-subtitle-1">Notifications</span>
          <VTooltip
            location="bottom"
            text="Mark all as read"
          >
            <template v-slot:activator="{ props }">
              <VBtn
                @click="notificationCount = 0"
                v-bind="props"
                icon
                flat
              >
                <VIcon
                  size="22"
                  icon="ph:envelope-open-light"
                />
              </VBtn>
            </template>
          </VTooltip>
        </VCardTitle>
        <v-list lines="three">
          <v-list-item
            density="comfortable"
            v-for="item in notifications"
            :key="item.title"
            :value="item"
          >
            <template #prepend>
              <VAvatar
                size="50"
                class="bg-grey-lighten-3"
              >
                <VIcon :icon="item.icon" />
              </VAvatar>
            </template>
            <template #title>
              <span
                v-html="item.title"
                class="text-subtitle-1 font-weight-bold"
              ></span>
            </template>
            <template #subtitle>
              <span
                :class="[darkTheme ? 'font-weight-light' : '']"
                v-html="item.text"
                class="text-subtitle-2"
              ></span>
              <br />
              <span
                :class="[darkTheme ? 'text-primary-lighten-2' : 'text-primary']"
                class="text-caption"
                >{{ item.date }}</span
              >
            </template>
          </v-list-item>
        </v-list>
      </VCard>
    </v-menu>
    <!-- cart -->
    <v-menu width="400">
      <template v-slot:activator="{ props }">
        <VBtn
          class="mr-2"
          v-bind="props"
          icon
          :disabled="isCart"
        >
          <v-badge
            v-if="cartCount"
            :content="cartCount"
            color="primary"
          >
            <VIcon
              class="text-medium-emphasis"
              icon="solar:bag-5-linear"
            />
          </v-badge>
          <VIcon
            class="text-medium-emphasis"
            v-else
            icon="solar:bag-5-linear"
          />
        </VBtn>
      </template>
      <VCard
        rounded="lg"
        class="shadow"
      >
        <VCardTitle class="d-flex align-center justify-space-between">
          <span class="font-weight-bold text-subtitle-1"> Cart </span>
          <VTooltip
            location="bottom"
            text="go to cart"
          >
            <template v-slot:activator="{ props }">
              <VBtn
                @click="navigateTo('/shoppingCart')"
                v-bind="props"
                icon
                flat
              >
                <VIcon
                  size="22"
                  icon="solar:bag-5-linear"
                />
              </VBtn>
            </template>
          </VTooltip>
        </VCardTitle>
        <v-list lines="three">
          <v-list-item
            density="comfortable"
            v-for="item in cartArr"
            :key="item.id"
            :value="item"
            @click="navigateTo(`/item/${item.id}`)"
          >
            <template #prepend>
              <VAvatar
                size="50"
                class=""
              >
                <VImg
                  cover
                  class="md-2"
                  :src="item.thumbnail"
                >
                </VImg>
              </VAvatar>
            </template>
            <template #title>
              <span
                v-html="item.title"
                class="text-subtitle-1 font-weight-bold"
              ></span>
            </template>
            <template #subtitle>
              <span
                :class="[darkTheme ? 'font-weight-light' : '']"
                v-html="item.brand"
                class="text-subtitle-2"
              ></span>
              <br />
              <span
                :class="[darkTheme ? 'text-primary-lighten-2' : 'text-primary']"
                class="text-caption"
                >{{ item.category }}</span
              >
            </template>
          </v-list-item>
        </v-list>
      </VCard>
    </v-menu>
    <!-- Profile -->
    <v-menu width="250">
      <template v-slot:activator="{ props }">
        <VBtn
          class="mr-2"
          v-bind="props"
          icon
        >
          <VAvatar size="36">
            <VImg src="https://avatars.githubusercontent.com/u/76650506?v=4" />
          </VAvatar>
        </VBtn>
      </template>
      <VCard
        rounded="lg"
        class="shadow"
      >
        <VListItem class="ma-2 mb-3">
          <template #title>
            <span class="text-subtitle-1 font-weight-medium">Mihail FR</span>
          </template>
          <template #subtitle>
            <span>fmr@example.com</span>
          </template>
        </VListItem>
        <VDivider />
        <v-list nav>
          <v-list-item
            v-for="item in profileActions"
            :key="item.title"
            :value="item"
            @click="goTo(item.url)"
          >
            <template #prepend>
              <VIcon
                class="text-medium-emphasis mr-5"
                :icon="item.icon"
              />
            </template>
            <template #title>
              <span
                v-html="item.title"
                class="text-subtitle-2 font-weight-medium"
              ></span>
            </template>
          </v-list-item>
        </v-list>
        <VDivider />
        <VList nav>
          <v-list-item link>
            <template #prepend>
              <VIcon
                class="text-medium-emphasis mr-5"
                icon="fluent:arrow-exit-20-regular"
              />
            </template>
            <template #title>
              <span class="text-subtitle-2 font-weight-medium">Logout</span>
            </template>
          </v-list-item>
        </VList>
      </VCard>
    </v-menu>
  </VAppBar>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useUserStore } from '~/stores/user'
import { type item } from '@/types'
import dayjs from 'dayjs'

const userStore = useUserStore()
const theme = useTheme()

let cartArr = ref<item[]>([])

const languages = ref([
  { icon: 'material-symbols:language-us', title: 'English' },
  { icon: 'material-symbols:language-spanish-rounded', title: 'Spanish' },
  { icon: 'material-symbols:language-french', title: 'French' },
])
const selectedLanguage = ref(languages.value[0])
const cartCount = computed(() => userStore.cart.length)
const isCart = computed(() => {
  if (userStore.cart.length > 0) {
    return false
  }
  return true
})

const notificationCount = ref(2)
const notifications = ref([
  {
    title: 'New Order',
    text: 'A new order was just placed by <strong>Jane Doe</strong>.',
    date: dayjs().format('MMM DD, YYYY, h:mm A'),
    icon: 'fluent:box-24-regular',
  },
  {
    title: 'New Customer',
    text: '<strong>Orlando Doe</strong> joined today.',
    date: dayjs().format('MMM DD, YYYY, h:mm A'),
    icon: 'fluent:person-24-regular',
  },
])

const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value == MAIN_THEME ? MAIN_DARK_THEME : MAIN_THEME
}

const darkTheme = computed(() => theme.current.value.dark)

const profileActions = ref([
  { icon: 'fluent:person-24-regular', title: 'Profile', url: '/profile' },
  { icon: 'solar:bag-5-linear', title: 'Cart', url: '/shoppingCart' },
  { icon: 'fluent:settings-24-regular', title: 'Settings', url: '/settings' },
])

const goTo = (value: string) => {
  return navigateTo(value)
}

onBeforeMount(() => {
  cartArr.value = userStore.cart
})
</script>

<style lang="scss" scoped></style>
