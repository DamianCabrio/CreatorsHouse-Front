<template>
  <div>
    <div
      v-for='user in users'
      :key="user.id"
    >
      <div class="q-pa-sm">
        <q-card
          bordered
          flat
        >
          <div
            v-ripple
            @click="goHomeCreator(user.idCreator[0].id)"
            class="cursor-pointer relative-position"
          >
            <q-item>
              <q-item-section avatar>
                <q-btn
                  color="secondary"
                  flat
                  icon="call_made"
                  round
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>@{{ user.username }}</q-item-label>
                <q-item-label caption>{{ user.name }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-img
              :ratio="1.8/1"
              v-bind:src="`http://localhost:8000/${user.avatar}`"
            >
            </q-img>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OneRandomCreators',
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
        const data = await fetch('http://localhost:8000/userShowOneRandCreator')
        const response = await data.json()
        // console.log(response.data.id)
        this.users = response.data
      } catch (error) {
        console.error(error)
      }
    },
    goHomeCreator ($idCreator) {
      // this.$q.notify('Ir a Creator Home!')
      // alert($idCreator)
      // this.$router.push({ name: 'Creator', params: { $idCreator } })
      this.$router.push(this.$route.query.redirect || '/Creator/' + $idCreator)
    }
  }
}
</script>
