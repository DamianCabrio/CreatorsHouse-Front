<template>
  <div>
    <div
      v-for='user in users'
      :key="user.id"
    >
      <div class="q-pa-lg">
        <q-card class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-btn
                flat
                round
                color="secondary"
                icon="share"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>@{{user.username}}</q-item-label>
              <q-item-label caption>{{user.name}}</q-item-label>
            </q-item-section>
          </q-item>

          <q-img
            :ratio="1.8/1"
            v-bind:src="`http://localhost:8000/img/${user.avatar}`"
          >
          </q-img>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeRandomCreators',
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
