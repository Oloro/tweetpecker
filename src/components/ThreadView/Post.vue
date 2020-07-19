<template>
  <div class="grid grid-cols-12 p-2 bg-gray-100 border border-gray-300">
    <div class="col-span-1">
      <img :src="userProfileOrDefault" alt="" class="rounded-full" />
    </div>
    <div class="col-span-11">
      <div>
        <span class="font-bold">{{ postData.user.name }} </span>
        <span class="text-gray-600">@{{ postData.user.screenName }} </span>
        <span class="text-gray-600">· {{ createdAtFormated }}</span>
      </div>
      <div>
        <span class="text-gray-600 text-md ">{{ replyingTo }}</span>
      </div>
      <div>
        <span class="inline-block mt-2">{{ pureFullText }}</span>
      </div>
      <div class="grid grid-cols-3 mt-4">
        <div class="w-5 ml-6">
          <span>
            <svg viewBox="0 0 24 24">
              <path
                d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
              ></path>
            </svg>
          </span>
          <span>{{ postData.content.replyCount }}</span>
        </div>
        <div class="w-5 ml-6">
          <svg viewBox="0 0 24 24">
            <g>
              <path
                d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
              ></path>
            </g>
          </svg>
        </div>
        <div class="w-5 ml-6">
          <svg viewBox="0 0 24 24">
            <g>
              <path
                d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Post extends Vue {
  @Prop({ required: true }) postData!: any;

  get createdAtFormated() {
    return this.postData.content.createdAt;
  }
  get userProfileOrDefault() {
    return this.postData.user.profileImageUrl ===
      'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
      ? require('../../assets/default_profile_normal.png') // webpack can't import this otherwise
      : this.postData.user.profileImageUrl;
  }
  get replyingTo() {
    const replyingToUsers = [
      ...(this.postData.content.fullText as string).matchAll(
        /(?<=^|@\w+ )@\w+/g
      )
    ];

    return replyingToUsers.length === 0
      ? ''
      : `replying to ${replyingToUsers
          .join(', ')
          .replace(/,(?!.*,)/g, ' and')}`;
  }
  get pureFullText() {
    return [
      ...(this.postData.content.fullText as string).matchAll(
        /(?<=^|@\w+ )[^@].+/g
      )
    ].toString();
  }
}
</script>

<style scoped></style>
