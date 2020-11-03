<template>
  <div class="row justify-center">
    <div class="col-12 col-md-8 q-pa-md q-gutter-sm">
      <div class="row justify-center">
        <div class="col-12 q-pa-md text-center">
          <q-responsive :ratio="16/2">
            <div class="rounded-borders bg-secondary text-white flex flex-center">
              Alguna cosa acá?
            </div>
          </q-responsive>
        </div>
        <div class="col-12 q-pa-xl text-center">
          <div class="text-h4">Editar Mi Perfil</div>
          <div>Configurá tus datos</div>
        </div>
        <div class="col-12 col-md-8 q-pa-md">
          <q-form>
            <q-card
              flat
              bordered
              class="q-mb-md"
            >
              <q-card-section>
                <div class="text-caption q-pb-sm">Avatar</div>
                <q-file
                  outlined
                  v-model="avatar"
                  label="imagen avatar jpg/png/gif"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-pb-sm">Banner</div>
                <q-file
                  outlined
                  v-model="banner"
                  label="imagen banner en jpg/png/gif"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-pb-sm">Descripción de mi perfil</div>
                <template>
                  <div>
                    <q-editor
                      v-model="description"
                      min-height="10rem"
                    />
                  </div>
                </template>
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-pb-sm">Link a Instagram</div>
                <q-input
                  outlined
                  v-model="instagram"
                  label="Instagram"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-pb-sm">Convertirme en creador</div>
                <q-toggle
                  size="xl"
                  v-model="becreator"
                  val="xl"
                  label="Ser o no ser creador"
                />
              </q-card-section>
            </q-card>
          </q-form>
        </div>
        <div class="col-12 col-md-4 q-pa-md">
          <div class="q-pb-md">
            <q-btn
              color="accent"
              text-color="white"
              label="Guardar Cambios"
              style="width:100%"
              size="lg"
            />
          </div>
          <q-card
            flat
            bordered
            class="q-mb-md"
          >
            <q-responsive :ratio="4/4">
              <div class="rounded-borders bg-primary text-white flex flex-center">
                Alguna cosa acá
              </div>
            </q-responsive>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      avatar: '',
      banner: '',
      description: '',
      instagram: '',
      becreator: false
    }
  }
}
</script>
