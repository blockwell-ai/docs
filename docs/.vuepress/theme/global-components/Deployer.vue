<template>
    <div class="deployer-block">
        <h3>Make Your Own <slot></slot></h3>
        <p>
            You can deploy your own <slot></slot> on the Rinkeby network using our deployer
            (<router-link :to="deployersUrl" class="">what are deployers?</router-link>)
        </p>
        <a :href="url" target="_blank" class="btn btn-primary">Deploy Your Own <slot></slot></a>
    </div>
</template>

<script>
    import { ensureExt } from '../util'
    export default {
        props: {
            code: {
                type: String,
                required: true
            },
            query: String
        },
        computed: {
            url() {
                let url = `https://app.blockwell.ai/${this.code}`;
                if (this.query) {
                    url += `?${this.query}`;
                }
                return url;
            },
            deployersUrl () {
                return ensureExt('/contracts/blockwell-contracts.md#what-are-deployers');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/config';
    @import "~@material/elevation/mdc-elevation";

    .deployer-block {
        margin: 12px;
        padding: 20px 25px 15px;
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
