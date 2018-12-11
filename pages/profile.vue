<template>
  <div class="container">

    <div class="card">
      <div class="card-header">
        <h3>{{ name }}</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div
            class="col-md-3 col-lg-3"
            align="center">
            <img
              :src="avatarURL"
              alt="avatar"
              class="rounded-circle img-fluid">
          </div>

          <div class=" col-md-9 col-lg-9 ">
            <table class="table">
              <tbody>
                <tr>
                  <td>Department:</td>
                  <td>{{ department }}</td>
                </tr>
                <tr>
                  <td>Hire date:</td>
                  <td>{{ hireDate }}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{{ DoB }}</td>
                </tr>

                <tr/><tr>
                  <td>Gender</td>
                  <td>{{ gender }}</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>{{ location }}</td>
                </tr>
                <tr>
                  <td>School</td>
                  <td>{{ school }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <a href="mailto:info@support.com">
                      {{ email }}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>
                    {{ phoneNumber }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted">
        <span class="float-right">
          <button
            v-b-modal.modalPrevent
            data-original-title="Edit this profile"
            data-toggle="tooltip"
            type="button"
            class="btn btn-sm btn-warning">
            <i class="fas fa-edit"/>
          </button>
        </span>
      </div>

    </div>

    <b-modal
      id="modalPrevent"
      ref="modal"
      :no-close-on-backdrop="noCloseOnBackdrop"
      :no-close-on-esc="noCloseOnEsc"
      title="Edit your profile"
      size="lg"
      @ok="handleOk">
      <form @submit.stop.prevent="handleSubmit">
        <b-form-group
          id="nameGroup"
          label="Your Name:"
          label-for="nameInput">
          <b-form-input
            id="nameInput"
            v-model="name"
            type="text"
            required
            placeholder="Enter your name"/>
        </b-form-group>

        <b-form-group
          id="deptGroup"
          label="Your Department:"
          label-for="deptInput">
          <b-form-input
            id="deptInput"
            v-model="department"
            type="text"
            required
            placeholder="Enter your department"/>
        </b-form-group>

        <b-form-group
          id="hireDateGroup"
          label="Your Hire Date:"
          label-for="hireDateInput">
          <b-form-input
            id="hireDateInput"
            v-model="hireDate"
            type="text"
            required
            placeholder="Enter your hire date"/>
        </b-form-group>
        <b-form-group
          id="dobGroup"
          label="Your Born:"
          label-for="dobInput">
          <b-form-input
            id="dobInput"
            v-model="DoB"
            type="text"
            required
            placeholder="Enter your Date of Birth"/>
        </b-form-group>
        <b-form-group
          id="genderGroup"
          label="Your Gender:"
          label-for="genderInput">
          <b-form-input
            id="genderInput"
            v-model="gender"
            type="text"
            required
            placeholder="Enter your gender"/>
        </b-form-group>
        <b-form-group
          id="locationGroup"
          label="Your Location:"
          label-for="locationInput">
          <b-form-input
            id="locationInput"
            v-model="location"
            type="text"
            required
            placeholder="Enter your location"/>
        </b-form-group>
        <b-form-group
          id="schoolGroup"
          label="Your School:"
          label-for="schoolInput">
          <b-form-input
            id="schoolInput"
            v-model="school"
            type="text"
            required
            placeholder="Enter your school"/>
        </b-form-group>
        <b-form-group
          id="emailGroup"
          label="Your Email:"
          label-for="emailInput">
          <b-form-input
            id="emailInput"
            v-model="email"
            type="text"
            required
            placeholder="Enter your email"/>
        </b-form-group>
        <b-form-group
          id="phoneNumberGroup"
          label="Your Phone Number:"
          label-for="phoneNumberInput">
          <b-form-input
            id="phoneNumberInput"
            v-model="phoneNumber"
            type="text"
            required
            placeholder="Enter your phone number"/>
        </b-form-group>

      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noCloseOnBackdrop: true,
      noCloseOnEsc: true,
      date: new Date().getFullYear(),
      name: '',
      department: '',
      hireDate: '',
      DoB: '',
      gender: '',
      location: '',
      school: '',
      email: '',
      phoneNumber: '',
      description: '',
      status: ''
    }
  },
  computed: {
    avatarURL() {
      const profile = this.$store.state.profile
      return profile && profile.image && profile.image.contentUrl
        ? profile.image.contentUrl['/']
        : 'https://ipfs.io/ipfs/QmUSwUCUNMmrHSr72NXv9VufFqqVEjGwozD9MxPb1YjzWj'
    }
  },
  mounted() {
    this.handleProfile()
  },
  methods: {
    handleOk(evt) {
      evt.preventDefault()
      if (!this.name) {
        alert('Please enter your name')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit() {
      this.$store.dispatch('updateProfileData', this.$data)
      this.$refs.modal.hide()
      this.$store.dispatch('loadProfileData')
    },
    handleProfile() {
      const profile = this.$store.state.profile
      if (profile) {
        this.name = profile.name
        this.location = profile.location
        this.school = profile.school
        this.description = profile.description
        this.status = profile.status
        this.email = profile.email
        this.hireDate = profile['linked-ref.hireDate']
        this.department = profile['linked-ref.department']
        this.DoB = profile['linked-ref.dob']
        this.gender = profile['linked-ref.gender']
        this.phoneNumber = profile.phoneNumber
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
