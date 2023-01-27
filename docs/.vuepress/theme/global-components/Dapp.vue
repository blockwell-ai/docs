<template>
    <div class="deployer-block">
        <p>
            <slot></slot> {{text}}
        </p>
        <a :href="url" target="_blank" class="btn btn-primary">
            Open <slot></slot> {{type}}
        </a>
    </div>
</template>

<script>
export default {
    props: {
        url: String,
        text: {
          type: String,
          default: "contracts can be used with a dapp"
        },
      type: {
          type: String,
        default: "Dapp"
      }
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/config';
@import "~@material/elevation/mdc-elevation";

.deployer-block {
    margin: 12px;
    padding: 10px 25px 20px;
    @include mdc-elevation(4, #666);
    font-size: 0.9em;

    border: 1px solid rgba($primary, .4);

    h3 {
        margin: 0;
    }


    @media (max-width: $MQMobile) {
        margin: 12px 0;
    }
}
</style>
