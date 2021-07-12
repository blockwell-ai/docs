<template>
    <div class="deployer-block">
        <p>
            <slot></slot> contracts can be used with a dapp
        </p>
        <a :href="url" target="_blank" class="btn btn-primary">
            Open <slot></slot> Dapp
        </a>
    </div>
</template>

<script>
export default {
    props: {
        url: String
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
