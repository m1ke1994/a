
<!-- <script>
import axios from 'axios';
export default {
  props: {
     added: Array,
     fetchAdded: Function,
     totalSum: Number,
     goHome:Function,
     clearAdded:Function,
   },
  data() {
    return {
      firstName: '',
      lastName: '',
      middleName: '',
      telephone: '',
      email: '',
      area: '',
      city: '',
      street: '',
      house: '',
      room: '',
      repairPeriod: '',
      success:false,
      error:false,
      
    };
  },
  
  methods: {
   



 async createOrder(){
  try{
    await axios.post('http://localhost:3005/order',{
      firstName:this.firstName,
      lastName:this.lastName,
      middleName:this.middleName,
      telephone:this.telephone,
      email:this.email,
      area:this.area,
      city:this.city, 
      street:this.street,
      house:this.house,
      room:this.room,
      repairPeriod:this.repairPeriod,
      price:this.totalSum,
      products:this.added
    });
       
      this.firstName='',
      this.lastName='',
      this.middleName='',
      this.telephone='',
      this.email='',
      this.area='',
      this.city='', 
      this.street='',
      this.house='',
      this.room='',
      this.repairPeriod='',
      this.success=true,
      this.error=false
      this.clearAdded()
  } catch (err) {
    this.success = false;
    this.error = true;
    }

},
reloadPage() {
      window.location.reload();
    },
},
}
</script>



 <template>
  <div class="p-10">
    <div class="flex items-center gap-8">
      <div>
        <svg
          @click="goHome"
          class="opacity-50 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1"
          width="30"
          height="30"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7H14.7143"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.71436 1L14.7144 7L8.71436 13"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <h2 class="text-3xl font-bold max-sm:text-lg" v-if="!success">Оформление заказа</h2>
      <h2 class="text-3xl font-bold max-sm:text-lg" v-if="success">Перейти на главную</h2>
    </div>
    <div class="text-lime-600 text-4xl  text-center mt-10 max-sm:text-lg" v-if="success">Заявка оформлена</div>
    <div v-if="!success">
      <div class="p-10  p-8 mt-4 rounded-xl " >
      <div class="mt-10" v-if="added.length>0" >
        <h2 class="text-lg font-bold max-sm:text-sm" >*Отредактируйте корзину, если это требуется: </h2>
      </div>
      <div class="mt-10" v-else>
        <h2 class="text-lg font-bold max-sm:text-sm"  > Перейдите на главную страницу для выбора услуги</h2>
      </div>
     

      <div class="mt-2 grid grid-cols-2 gap-4 max-sm:grid-cols-1 gap-3">
        <div
          class="bg-zinc-50  p-1 flex justify-between gap-2 items-center rounded-xl mt-2"
          v-for="add in added"
          :key="add._id"
        >
          <img
            :src="`/repair_photo/${add.image}`"
            alt="photo"
            class="w-32  rounded-xl p-4 max-sm:w-1/3 max-sm:hidden"
          />
          <div class="flex flex-col justify-between sm:">
            <p class="text-lg max-sm:text-sm sm:text-sm">{{ add.title }} {{ add.model }}</p>
            <div class="flex justify-between mt-2 ">
              <b>{{ add.price }} руб</b>
              <img
                class="opacity-60 hover:opacity-100 transition cursor-pointer w-8 max-sm:w-1/6"
                src="/close.svg"
                alt="close"
                @click="fetchAdded(add._id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-10  p-8 mt-4 rounded-xl">
      <div class="flex items-center gap-8">
        <h2 class="text-lg font-bold ">*Заполните данные:</h2>
      </div>
      <div class="text-red-500 text-3xl max-sm:text-lg" v-if="error">Произошла ошибка, попробуйте ещё раз</div>
      
      <form @submit.prevent="createOrder"    >
        <div class="mt-10 flex flex-wrap gap-2 ">
          <div class="bg-zinc-50 border  flex-1 rounded-xl max-sm:text-sm">
            <div class="flex flex-col gap-2"> 
              <div class="flex flex-col ">
                <label for="firstName">Введите Имя:</label>
                <input
                  v-model="firstName"
                  @input="allFields"
                  
                  id="firstName"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-8"
                  type="text"
                  maxlength="20"
                  placeholder="Имя"
                />
               
              </div>
              <div class="flex flex-col">
                <label for="lastName">Введите Фамилию:</label>
                <input
                  v-model="lastName"
                  @input="allFields"
                  id="lastName"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-8"
                  type="text"
                  maxlength="15"
                  placeholder="Фамилия"
                />
              </div>
              <div class="flex flex-col">
                <label for="middleName">Введите Отчество:</label>
                <input
                  v-model="middleName"
                  @input="allFields"
                  id="middleName"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-8"
                  type="text"
                  maxlength="15"
                  placeholder="Отчество"
                />
              </div>
              <div class="flex flex-col">
                <label for="phone">Введите Телефон:</label>
                <input
                  v-model="telephone"
                  @input="allFields"
                  id="phone"
                  class=" no-arrows border border-black w-full rounded-md py-2 pr-4 outline-none pl-8"
                  type="number"
                  maxlength="15"
                  placeholder="Например, 89059770507"
                />
              </div>
            </div>
          </div>

          <div class="bg-zinc-50 border p-4 flex-1 rounded-xl max-sm:text-sm">
            <div class="flex flex-col gap-2">
              <div class="flex flex-col">
                <label for="email">Введите Email:</label>
                <input
                  v-model="email"
                  @input="allFields"
                  id="email"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-8"
                  type="email"
                  maxlength="30"
                  placeholder="Email"
                />
              </div>
              <div class="flex gap-2 ">
                <div class="flex flex-col">
                  <label for="area">Область:</label>
                  <input
                    v-model="area"
                    id="area"
                    class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-8"
                    type="text"
                    maxlength="50"
                    placeholder="Московская"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="city">Город:</label>
                  <input
                    v-model="city"
                    @input="allFields"
                    id="city"
                    class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-8"
                    type="text"
                    maxlength="20"
                    placeholder="Наро-фоминск"
                  />
                </div>
              </div>
              <div class="flex gap-2 ">
                <div class="flex flex-col">
                  <label for="street">Улица:</label>
                  <input
                    v-model="street"
                    @input="allFields"
                    id="street"
                    class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-8"
                    type="text"
                    maxlength="50"
                    placeholder="Ленина"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="house">Дом:</label>
                  <input
                    v-model="house"
                    @input="allFields"
                    id="house"
                    class=" no-arrows border border-black w-full rounded-md py-2 pr-4 outline-none pl-8"
                    type="number"
                    maxlength="100"
                    placeholder="25"
                  />
                </div>
                <div class="flex flex-col">
                  <label for="room">Кв:</label>
                  <input
                    v-model="room"
                    @input="allFields"
                    id="room"
                    class="no-arrows border border-black w-full rounded-md py-2 pr-4 outline-none pl-8"
                    type="number"
                    placeholder="101"
                  />
                </div>
              </div>
              <div class="flex py-4 items-center justify-around">
                <label for="date" class="font-bold">Выберите срок ремонта:</label>
                <select name="" id="date" class="py-2 px-3 border rounded-md outline-none" v-model="repairPeriod">
                  <option value="">--------</option>
                  <option value="1-2 дня">1-2 дня</option>
                  <option value="3-4 дня">3-4 дня</option>
                  <option value="до 7 дней">до 7 дней</option>
                </select>
              </div>
              <div class="flex items-center flex-wrap">
                <button type="submit"
                  :disabled="totalSum===0"
                  class="bg-lime-600 w-auto px-3 rounded-xl py-3 hover:bg-lime-900 transition text-white disabled:bg-slate-500 cursor-pointer mx-auto"
                >
                  Перейти к оплате
                </button>
                <div class="flex items-center gap-2">
                  <span class="text-xl msx-sm:text-lg">Итого:</span>
                  <b class="text-xl my-3 msx-sm:text-lg">{{ totalSum }} руб</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
    
  </div>
</template>


<style scoped> 
.no-arrows::-webkit-outer-spin-button,
.no-arrows::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-arrows {
-moz-appearance: textfield;
}
</style> -->







<script>
import axios from 'axios';
export default {
  props: {
     added: Array,
     fetchAdded: Function,
     totalSum: Number,
     goHome:Function,
     clearAdded:Function,
   },
  data() {
    return {
      firstName: '',
      lastName: '',
      middleName: '',
      telephone: '',
      email: '',
      area: '',
      city: '',
      street: '',
      house: '',
      room: '',
      repairPeriod: '',
      success:false,
      error:false,
      
    };
  },
  
  methods: {
   



 async createOrder(){
  try{
    await axios.post('http://localhost:3005/order',{
      firstName:this.firstName,
      lastName:this.lastName,
      middleName:this.middleName,
      telephone:this.telephone,
      email:this.email,
      area:this.area,
      city:this.city, 
      street:this.street,
      house:this.house,
      room:this.room,
      repairPeriod:this.repairPeriod,
      price:this.totalSum,
      products:this.added
    });
       
      this.firstName='',
      this.lastName='',
      this.middleName='',
      this.telephone='',
      this.email='',
      this.area='',
      this.city='', 
      this.street='',
      this.house='',
      this.room='',
      this.repairPeriod='',
      this.success=true,
      this.error=false
      this.clearAdded()
  } catch (err) {
    this.success = false;
    this.error = true;
    }

},
reloadPage() {
      window.location.reload();
    },
},
}
</script>

<template>
  <div class="p-10">
    <div class="flex gap-4 items-center">
      <div>
        <svg
          @click="goHome"
          class="opacity-50 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1"
          width="30"
          height="30"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7H14.7143"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.71436 1L14.7144 7L8.71436 13"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        </div>
        <h2 class="text-3xl font-bold max-sm:text-lg" v-if="!success">Оформление заказа</h2>
        <h2 class="text-3xl font-bold max-sm:text-lg" v-if="success">Перейти на главную</h2>
      </div>
      <div class="text-red-500 text-3xl max-sm:text-lg" v-if="error">Произошла ошибка, попробуйте ещё раз</div>
      <div class="text-lime-600 text-4xl  text-center mt-10 max-sm:text-lg" v-if="success">Заявка оформлена</div>
<!-- создание инпуов -->
<div v-if="!success">
  <form @submit.prevent="createOrder">
<div class="flex justify-around max-md:flex-col">
  <div class="w-2/5 max-md:w-full text-sm">
              <div class="flex flex-col my-2 ">
                <label for="firstName">Введите Имя:</label>
                <input
                  v-model="firstName"
                  @input="allFields"
                  
                  id="firstName"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                  type="text"
                  maxlength="20"
                  placeholder="Имя"
                />
              </div>
              <div class="flex flex-col my-2">
                <label for="lastName">Введите Фамилию:</label>
                <input
                  v-model="lastName"
                  @input="allFields"
                  id="lastName"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                  type="text"
                  maxlength="15"
                  placeholder="Фамилия"
                />
              </div>
              <div class="flex flex-col my-2">
                <label for="middleName">Введите Отчество:</label>
                <input
                  v-model="middleName"
                  @input="allFields"
                  id="middleName"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                  type="text"
                  maxlength="15"
                  placeholder="Отчество"
                />
              </div>
              <div class="flex flex-col my-2">
                <label for="phone">Введите Телефон:</label>
                <input
                  v-model="telephone"
                  @input="allFields"
                  id="phone"
                  class=" no-arrows border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                  type="number"
                  maxlength="15"
                  placeholder="89059770507"
                />
              </div>
              <div class="flex py-4 items-center justify-around">
                <label for="date" class="font-bold"> Cрок ремонта:</label>
                <select name="" id="date" class="py-2 px-3 border rounded-md outline-none" v-model="repairPeriod">
                  <option value="">--------</option>
                  <option value="1-2 дня">1-2 дня</option>
                  <option value="3-4 дня">3-4 дня</option>
                  <option value="до 7 дней">до 7 дней</option>
                </select>
              </div>
            </div>

            
  <div class="w-2/5 max-md:w-full text-sm">
    <div class="flex flex-col my-2">
                <label for="email">Email:</label>
                <input
                  v-model="email"
                  @input="allFields"
                  id="email"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                  type="email"
                  maxlength="30"
                  placeholder="Email"
                />
              </div>
              <div class="flex flex-col my-2">
                  <label for="area">Область:</label>
                  <input
                    v-model="area"
                    id="area"
                    class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                    type="text"
                    maxlength="50"
                    placeholder="Московская"
                  />
                </div>
                <div class="flex flex-col my-2">
                  <label for="city">Город:</label>
                  <input
                    v-model="city"
                    @input="allFields"
                    id="city"
                    class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                    type="text"
                    maxlength="20"
                    placeholder="Наро-фоминск"
                  />
                </div>




                <div class="flex gap-2 my-2 max-md:w-full text-sm flex-wrap items-center">
                  <div class="flex flex-col max-md:w-auto">
                  <label for="street">Улица:</label>
                  <input
                    v-model="street"
                    @input="allFields"
                    id="street"
                    class="border border-black w-full rounded-md py-2  outline-none pl-2"
                    type="text"
                    maxlength="50"
                    placeholder="Ленина"
                  />
                </div>
                <div class="flex flex-col w-1/4 max-sm:w-2/5 ">
                  <label for="house">Дом:</label>
                  <input
                    v-model="house"
                    @input="allFields"
                    id="house"
                    class=" no-arrows border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                    type="number"
                    maxlength="100"
                    placeholder="25"
                  />
                </div>
                <div class="flex flex-col w-1/4 max-sm:w-2/5">
                  <label for="room">Кв:</label>
                  <input
                    v-model="room"
                    @input="allFields"
                    id="room"
                    class="no-arrows border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                    type="number"
                    placeholder="101"
                  />
                </div>
                </div>
                <!-- создание кнопки -->
              <div class="flex items-center flex-wrap gap-4">
               
                <div class="flex gap-2 items-center">
                  <span class="text-xl max-sm:text-lg">Итого:</span>
                  <b class="text-xl my-3 max-sm:text-lg">{{ totalSum }} руб</b>
                </div>
                <button type="submit"
                  :disabled="totalSum===0"
                  class="bg-lime-600 w-auto px-3 rounded-xl py-3 hover:bg-lime-900 transition text-white disabled:bg-slate-500 cursor-pointer "
                >
                  Перейти к оплате
                </button>
              </div>
          </div>

</div>
</form>
</div>



    
  






</div>

</template>

<style scoped> 
.no-arrows::-webkit-outer-spin-button,
.no-arrows::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-arrows {
-moz-appearance: textfield;
}
</style>
