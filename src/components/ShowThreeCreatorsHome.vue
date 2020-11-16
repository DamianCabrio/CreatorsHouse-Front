<template>
  <div class="row">
    <div
      v-for='user in users'
      :key="user.id"
      v-close-popup
      :idCreator="user.idCreator"
      class="col-12 col-md-4"
      clickable
    >
      <div class="q-pa-lg">
        <q-card class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-btn
                color="secondary"
                flat
                icon="call_made"
                round
                type="a"
                v-bind:href="`#/Creator/${user.id}`"
              /> <!-- -->
            </q-item-section>

            <q-item-section>
              <q-item-label>@{{ user.username }}</q-item-label>
              <q-item-label caption>{{ user.name }}</q-item-label>
            </q-item-section>
          </q-item>
          <a
            type="a"
            v-bind:href="`#/Creator/${user.id}`"
          >
            <q-img
              class="cursor-pointer"
              :ratio="1.8/1"
              v-bind:src="`http://localhost:8000/img/${user.avatar}`"
            >
            </q-img>
          </a>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowThreeCreatorsHome',
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getCreators()
  },
  methods: {
    getCreators: async function () {
      try {
        const data = await fetch('http://localhost:8000/userCreatorsHome')
        const response = await data.json()
        // console.log(response.data.id)
        this.users = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
